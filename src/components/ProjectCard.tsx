'use client'

interface ProjectCardProps {
  title: string
  category: string
  description: string
  tags: string[]
  link: string
  number: string
}

export default function ProjectCard({
  title,
  category,
  description,
  tags,
  link,
  number,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50 sm:p-9">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--muted)]">
            PROJECT {number}
          </span>
          <span className="text-xs text-[var(--muted)]">{category}</span>
        </div>

        <h3 className="mt-12 text-2xl font-semibold tracking-tight transition group-hover:text-[var(--accent)] sm:text-3xl">
          {title}
        </h3>

        <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)]">
          {description}
        </p>
      </div>

      <div className="mt-10 border-t border-[var(--line)] pt-6">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[var(--background)] px-3 py-2 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
        >
          View repository
          <span className="transition group-hover:translate-x-1">↗</span>
        </a>
      </div>
    </article>
  )
}