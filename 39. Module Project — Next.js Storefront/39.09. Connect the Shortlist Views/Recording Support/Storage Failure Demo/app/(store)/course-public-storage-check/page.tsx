"use client";
import { useState } from 'react';
export default function PublicShortlistStorageCheck() {
 const [message, setMessage] = useState('Only the ShopFront public-shortlist key will be removed.');
 function reset() {
  try { localStorage.removeItem('shopfront:public-shortlist'); setMessage('Public shortlist cleared. Return to the catalog, then reload it.'); }
  catch { setMessage('Browser storage is unavailable. The other browser keys were not changed.'); }
 }
 return <section><h1>Public shortlist storage check</h1><p role="status">{message}</p><button onClick={reset}>Reset public shortlist</button><p><a href="/catalog">Return to collection</a></p></section>;
}
