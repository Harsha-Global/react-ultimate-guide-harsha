// REUSE familiar process runner; LIVE destination guard and env belong before this helper.
function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { env, stdio: 'inherit' });
    child.on('error', reject); child.on('exit', code => code === 0 ? resolve() : reject(new Error(`Test setup failed: ${args[0]} (${code}).`)));
  });
}

// REUSE bounded log capture and finally shutdown after the LIVE server/health/test connections.
let log = ''; server.stdout.on('data', data => { log = (log + data).slice(-8000); }); server.stderr.on('data', data => { log = (log + data).slice(-8000); });
} catch (error) { console.error(log.replace(/token=[^&\s]+/g, 'token=[redacted]').replace(/reset-password\/[^?\s]+/g, 'reset-password/[redacted]')); throw error; }
finally {
  if (server.exitCode === null) {
    server.kill('SIGTERM');
    await new Promise(resolve => server.once('exit', resolve));
  }
}
