# Run from the installed shopfront-next project.
# This replaces CORS only on the NEW private practice bucket.
$env:B2_SETUP_ENDPOINT = Read-Host 'S3 HTTPS endpoint'
$env:B2_SETUP_REGION = Read-Host 'S3 region'
$env:B2_SETUP_BUCKET = Read-Host 'New private bucket name'
$env:B2_SETUP_ORIGIN = Read-Host 'Exact assigned HTTPS application origin'
$env:B2_SETUP_KEY_ID = Read-Host 'Temporary setup key ID'
$setupSecret = Read-Host 'Temporary setup application key' -AsSecureString
$env:B2_SETUP_SECRET = [System.Net.NetworkCredential]::new('', $setupSecret).Password

@'
import {
  S3Client,
  PutBucketCorsCommand,
  GetBucketCorsCommand,
} from '@aws-sdk/client-s3';

let client;

try {
  const origin = new URL(process.env.B2_SETUP_ORIGIN);
  const endpoint = new URL(process.env.B2_SETUP_ENDPOINT);

  if (
    origin.protocol !== 'https:' ||
    origin.pathname !== '/' ||
    origin.search ||
    origin.hash ||
    origin.username ||
    origin.password ||
    endpoint.protocol !== 'https:'
  ) {
    throw new Error();
  }

  client = new S3Client({
    endpoint: endpoint.href,
    region: process.env.B2_SETUP_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.B2_SETUP_KEY_ID,
      secretAccessKey: process.env.B2_SETUP_SECRET,
    },
    requestChecksumCalculation: 'WHEN_REQUIRED',
    maxAttempts: 2,
    requestHandler: {
      connectionTimeout: 2000,
      requestTimeout: 8000,
    },
  });

  const Bucket = process.env.B2_SETUP_BUCKET;

  await client.send(new PutBucketCorsCommand({
    Bucket,
    CORSConfiguration: {
      CORSRules: [{
        AllowedOrigins: [origin.origin],
        AllowedMethods: ['PUT'],
        AllowedHeaders: ['content-type'],
        MaxAgeSeconds: 300,
      }],
    },
  }));

  const result = await client.send(new GetBucketCorsCommand({ Bucket }));
  const rules = result.CORSRules;

  if (
    rules?.length !== 1 ||
    rules[0].AllowedOrigins?.length !== 1 ||
    rules[0].AllowedOrigins[0] !== origin.origin ||
    rules[0].AllowedMethods?.length !== 1 ||
    rules[0].AllowedMethods[0] !== 'PUT' ||
    rules[0].AllowedHeaders?.length !== 1 ||
    rules[0].AllowedHeaders[0] !== 'content-type' ||
    rules[0].MaxAgeSeconds !== 300
  ) {
    throw new Error();
  }

  console.log('Exact-origin browser upload rule saved and read back.');
} catch {
  console.error('CORS setup failed. Check the endpoint, region, bucket and setup-key permissions privately.');
  process.exitCode = 1;
} finally {
  client?.destroy();
}
'@ | node --input-type=module

$setupExit = $LASTEXITCODE
foreach ($name in @(
  'B2_SETUP_ENDPOINT',
  'B2_SETUP_REGION',
  'B2_SETUP_BUCKET',
  'B2_SETUP_ORIGIN',
  'B2_SETUP_KEY_ID',
  'B2_SETUP_SECRET'
)) {
  [Environment]::SetEnvironmentVariable($name, $null, 'Process')
}
$setupSecret = $null

if ($setupExit -ne 0) {
  throw 'Private bucket CORS configuration did not pass.'
}

