import { readFile } from 'node:fs/promises';
import path from 'node:path';
export async function SpotlightStory() {
 const text = await readFile(path.join(process.cwd(), 'data/spotlight.json'), 'utf8');
 const story: { title: string; body: string } = JSON.parse(text);
 return <section className="panel"><p className="eyebrow">Studio Desk Lamp</p><h2>{story.title}</h2><p>{story.body}</p></section>;
}
