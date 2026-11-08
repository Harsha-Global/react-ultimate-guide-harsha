import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import './globals.css';
import './storefront.css';
const manrope=localFont({src:'../public/fonts/Manrope-variable.woff2',variable:'--font-heading',display:'swap'});
const dmSans=localFont({src:'../public/fonts/DMSans-variable.woff2',variable:'--font-body',display:'swap'});
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body className={`${manrope.variable} ${dmSans.variable}`}>{children}</body></html>;}
