import type { ReactNode } from 'react';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'Data workshop',robots:{index:false,follow:false}};
export default function DataLabLayout({children}:{children:ReactNode}){return children;}
