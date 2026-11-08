import Link from 'next/link';
import { StorefrontHeading } from '@/components/StorefrontHeading';
export default function Home(){return <><StorefrontHeading/><Link className="button primary" href="/catalog">Explore the collection</Link></>;}
