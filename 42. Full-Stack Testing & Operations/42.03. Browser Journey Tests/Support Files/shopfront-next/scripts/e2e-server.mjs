import 'dotenv/config';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { randomBytes } from 'node:crypto';

// Write the isolated database guard and env here.
const children = new Set();let stopping=false;
function launch(args, options={}) { const child=spawn(process.execPath,args,{env,stdio:'inherit',...options});children.add(child);child.once('exit',()=>children.delete(child));return child; }
async function run(args) {const child=launch(args);const [code]=await once(child,'exit');if(code!==0)throw new Error(`Setup command failed (${code}).`);}
async function stop(code=0) {
  if(stopping)return;stopping=true;
  await Promise.all([...children].map(async child=>{const ended=once(child,'exit');child.kill('SIGTERM');const force=setTimeout(()=>child.kill('SIGKILL'),4000);force.unref();await ended;clearTimeout(force);}));
  process.exitCode=code;
}
process.on('SIGINT',()=>void stop());process.on('SIGTERM',()=>void stop());

// Write the setup/build/start sequence and its catch cleanup here.
