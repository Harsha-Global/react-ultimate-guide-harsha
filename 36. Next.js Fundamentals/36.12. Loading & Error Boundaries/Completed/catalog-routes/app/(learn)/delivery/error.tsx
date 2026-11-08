"use client";
export default function DeliveryError({ retry }: { retry: () => void }) {
  return <main><h1>Delivery is unavailable</h1><p role="alert">Try again when the service is ready.</p><button onClick={() => retry()}>Try delivery again</button></main>;
}
