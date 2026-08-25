interface AdminPlaceholderProps {
  title: string
}

export function AdminPlaceholder({ title }: AdminPlaceholderProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-medium text-text">{title}</h1>
        <p className="mt-1 text-text-secondary">This section is under development.</p>
      </div>
    </div>
  )
}
