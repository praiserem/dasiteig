const messages = [
  '10% off your first order — code KEPT10 at checkout',
  'New: the Satchel No. 2 Crossbody is in stock',
  'Refer a friend, both of you get $10',
]

export function AnnouncementBar() {
  return (
    <div className="w-full bg-ink text-paper">
      <div className="shell flex h-9 items-center justify-between gap-4 text-[11px] uppercase tracking-wideish">
        <p className="truncate">Free shipping on US orders over $75</p>
        <div className="hidden overflow-hidden sm:block">
          <p className="truncate text-muted">{messages[0]}</p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <a href="#" className="hidden hover:text-accent md:inline">
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
