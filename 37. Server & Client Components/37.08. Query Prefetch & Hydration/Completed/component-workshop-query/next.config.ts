import type { NextConfig } from 'next';
const config: NextConfig = {
 reactStrictMode: true,
 async rewrites() { return [{ source: '/sample-stock/:id', destination: 'http://127.0.0.1:5211/stock/:id' }]; },
};
export default config;
