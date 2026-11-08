import Image from 'next/image';
export function StorefrontHeading() {
 return <section className="store-hero"><div><p className="eyebrow">Considered essentials</p><h1>Fewer things.<br/>Better everyday.</h1><p>Useful objects for focused work, lighter journeys, and small daily rituals.</p></div><Image src="/assets/lamp.jpg" alt="Studio lamp in a calm workspace" width={600} height={360} sizes="(max-width:560px) 100vw, 50vw" preload/></section>;
}
