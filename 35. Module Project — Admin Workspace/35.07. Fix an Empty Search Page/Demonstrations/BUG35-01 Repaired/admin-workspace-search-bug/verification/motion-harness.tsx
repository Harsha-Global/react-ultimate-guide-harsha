import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Dialog, DialogTrigger } from "../src/components/ui/dialog";
import { ProductDetailsContent } from "../src/components/ProductDetails";
import { products } from "../src/catalog";
import "../src/index.css";
export function boot(initial: boolean, choose: (value: boolean) => void) {
 function Harness() {
  const [reduced,setReduced]=useState(initial);
  const [report,setReport]=useState("Open details to sample actual rendered motion.");
  useEffect(()=>{
   let frame=0;let active=false;const seen=new WeakSet<Element>();
   const observer=new MutationObserver(()=>{
    const element=document.querySelector<HTMLElement>('[data-detail-motion]');
    if(!element || active || seen.has(element))return;
    seen.add(element);
    active=true;const began=performance.now();const transforms=new Set<string>();const opacities=new Set<string>();
    function sample(){
     if(!element?.isConnected){active=false;return;}
     const style=getComputedStyle(element);transforms.add(style.transform);opacities.add(style.opacity);
     if(performance.now()-began<450)frame=requestAnimationFrame(sample);
     else{setReport(JSON.stringify({mode:element.dataset.detailMotion,transforms:[...transforms],opacities:[...opacities],finalTransform:style.transform,finalOpacity:style.opacity}));active=false;}
    }
    frame=requestAnimationFrame(sample);
   });
   observer.observe(document.body,{childList:true,subtree:true});return()=>{observer.disconnect();cancelAnimationFrame(frame)};
  },[]);
  return <main onKeyDown={event=>{if(event.key.toLowerCase()==="r"){const next=!reduced;setReduced(next);choose(next)}}} className="min-h-screen bg-background p-8 text-foreground"><h1 className="text-3xl font-bold">Motion behavior verification</h1><p className="mt-4 max-w-2xl">This isolated fixture simulates the JavaScript preference signal. It uses the actual product-details component and leaves operating-system settings unchanged. CSS media queries still use the real device preference. Press R while the dialog is open to toggle the simulated preference.</p><output className="mt-4 block max-w-2xl break-words text-sm" aria-label="Observed animation samples">{report}</output><label className="my-6 flex min-h-11 items-center gap-3"><input type="checkbox" checked={reduced} onChange={e=>{setReduced(e.target.checked);choose(e.target.checked)}}/>Simulate reduced motion</label><Dialog><DialogTrigger className="min-h-11 rounded border border-input px-5">Open product details</DialogTrigger><ProductDetailsContent product={products[0]}/></Dialog></main>;
 }
 createRoot(document.getElementById('root')!).render(<StrictMode><Harness/></StrictMode>);
}
