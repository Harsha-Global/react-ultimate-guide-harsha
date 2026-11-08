import 'dotenv/config';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
const binary = process.env.WEED_BINARY;
if (!binary) throw new Error('Set WEED_BINARY to the extracted official SeaweedFS executable.');
const data = process.env.STORAGE_DATA_DIR ?? '.local-storage';
await mkdir(data, { recursive: true });
const child = spawn(binary, ['mini', `-dir=${data}`, '-ip=127.0.0.1', '-ip.bind=127.0.0.1',
  '-s3.port=8333', '-bucket=shopfront-uploads', '-webdav=false', '-admin.ui=false',
  '-s3.port.iceberg=0', '-s3.port.lance=0', '-master.telemetry=false', '-volume.max=2',
  `-s3.allowedOrigins=${process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'}`,
], { stdio: 'inherit', env: { ...process.env, AWS_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY, AWS_SECRET_ACCESS_KEY: process.env.S3_SECRET_KEY } });
child.on('error', () => { console.error('SeaweedFS could not start. Check WEED_BINARY and the recording setup.'); process.exitCode = 1; });
process.on('SIGINT', () => child.kill('SIGINT'));
child.on('exit', code => { process.exitCode = code ?? 0; });
