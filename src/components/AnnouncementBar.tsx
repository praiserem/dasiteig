export function AnnouncementBar() {
  return (
    <div className="w-full border-b border-border bg-surface py-2">
      <div className="shell flex h-9 items-center justify-between gap-4 text-[11px] uppercase tracking-wide text-text-tertiary">
        <p className="truncate">10% off your first order — code KEPT10 at checkout</p>
        <div className="hidden items-center gap-4 sm:flex">
          <a href="#" className="hover:text-accent">
            Refer &amp; earn $10
          </a>
          <a href="#" className="hover:text-accent">
            Support
          </a>
        </div>
      </div>
    </div>
  )
}
