export function StaticPage({ title, body }: { title: string; body: string }) {
  return (
    <div className="shell max-w-2xl py-16 lg:py-24">
      <p className="eyebrow mb-3">KEPT</p>
      <h1 className="font-display text-3xl font-medium tracking-tighter sm:text-4xl text-text">{title}</h1>
      <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-text-secondary">{body}</p>
    </div>
  )
}
