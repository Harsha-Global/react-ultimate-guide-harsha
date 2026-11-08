export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold tracking-widest text-blue-800">CATALOG STUDIO</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Admin Workspace</h1>
        <p className="mt-4 max-w-xl text-lg text-slate-600">A clear place to review products and their availability.</p>
        <section aria-labelledby="setup-heading" className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 id="setup-heading" className="text-xl font-semibold">Your styling workspace is ready.</h2>
          <p className="mt-2 text-slate-600">Next, turn a product list into a useful catalog view.</p>
        </section>
      </div>
    </main>
  );
}
