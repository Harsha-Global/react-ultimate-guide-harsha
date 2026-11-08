import 'dotenv/config';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
const base = new URL(process.env.BETTER_AUTH_URL ?? 'http://localhost:3000');
if (!['localhost','127.0.0.1'].includes(base.hostname)) throw new Error('This command starts only the local development runner.');
const child = spawn(resolve(`node_modules/inngest-cli/bin/inngest${process.platform === 'win32' ? '.exe' : ''}`), ['dev', '--host', '127.0.0.1', '--no-discovery', '-u', `${base.origin}/api/inngest`], { stdio: 'inherit' });
process.on('SIGINT', () => child.kill('SIGINT'));
child.on('exit', code => { process.exitCode = code ?? 0; });
