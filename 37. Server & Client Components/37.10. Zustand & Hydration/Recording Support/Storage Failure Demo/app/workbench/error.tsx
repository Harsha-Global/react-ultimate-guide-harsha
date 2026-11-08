'use client';
export default function WorkbenchError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
 return <section className="panel error"><h1>The workbench could not load</h1><p>Restore the sample service, then try again.</p><button onClick={() => retry()}>Try again</button></section>;
}
