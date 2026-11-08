import { connection } from 'next/server';
import { readDelivery } from '@/lib/delivery';

export default async function DeliveryPage() {
  await connection();
  const message = await readDelivery();
  return <main><h1>Delivery</h1><p>{message}</p></main>;
}
