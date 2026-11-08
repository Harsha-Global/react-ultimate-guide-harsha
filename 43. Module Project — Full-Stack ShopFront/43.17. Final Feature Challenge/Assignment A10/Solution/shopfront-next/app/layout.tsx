import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import './globals.css';
import './storefront.css';
import './fullstack.css';
import './shopfront-release.css';
const manrope=localFont({src:'../public/fonts/Manrope-variable.woff2',variable:'--font-heading',display:'swap'});
const dmSans=localFont({src:'../public/fonts/DMSans-variable.woff2',variable:'--font-body',display:'swap'});
export const metadata:Metadata={metadataBase:siteUrl,title:{default:'ShopFront — Everyday essentials',template:'%s | ShopFront'},description:'A four-product sandbox storefront with private orders and merchant workspaces.'};
export default function RootLayout({children}:{children:ReactNode}){return (
  <html lang="en">
    <body className={`${manrope.variable} ${dmSans.variable}`}>{children}</body>
  </html>
);}
