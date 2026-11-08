# Run from the reviewed preview project, with no local .env file.
$ErrorActionPreference = 'Stop'
$dbSecret = Read-Host 'New preview External Database URL with required TLS settings' -AsSecureString

try {
    $env:DATABASE_URL = [System.Net.NetworkCredential]::new('', $dbSecret).Password
    $env:DIRECT_URL = $env:DATABASE_URL

    npm run db:deploy

    if ($LASTEXITCODE -ne 0) {
        throw 'Preview migration failed. Do not continue to deployment.'
    }
}
finally {
    [Environment]::SetEnvironmentVariable('DATABASE_URL', $null, 'Process')
    [Environment]::SetEnvironmentVariable('DIRECT_URL', $null, 'Process')
    $dbSecret = $null
}
