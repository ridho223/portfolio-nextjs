'use client'

import Reveal from './Reveal'
import { useSite } from './SiteProvider'

const groups = [
  {
    title: 'Backend Development',
    description: {
      id: 'Logika aplikasi, API, dan semua yang berjalan di sisi server.',
      en: 'Application logic, APIs, and everything that runs on the server side.',
    },
    items: ['PHP', 'Laravel', 'REST API', 'CRUD'],
  },
  {
    title: 'Database',
    description: {
      id: 'Merancang dan mengelola data relasional supaya rapi dan mudah dikembangkan.',
      en: 'Designing and managing relational data so it stays clean and easy to extend.',
    },
    items: ['MySQL', 'Database Design', 'HeidiSQL'],
  },
  {
    title: 'Frontend',
    description: {
      id: 'Antarmuka yang rapi, responsif, dan nyaman dipakai.',
      en: 'Interfaces that are clean, responsive, and comfortable to use.',
    },
    items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  },
  {
    title: 'Tools',
    description: {
      id: 'Alat kerja harian untuk menulis kode, mendesain, dan berkolaborasi.',
      en: 'Day-to-day tools for writing code, designing, and collaborating.',
    },
    items: ['Git', 'GitHub', 'VS Code', 'Figma'],
  },
]

export default function Skills() {
  const { language } = useSite()
  const id = language === 'id'

  return (
    <section id="skills" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 max-w-2xl">

              <p className="mb-4 text-sm font-medium tracking-wide text-[var(--accent)]">
                {id ? 'KEAHLIAN' : 'SKILLS'}
              </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              {id ? 'Alat yang saya pakai untuk membangun.' : 'The tools I build with.'}
            </h2>

            <p className="mt-5 leading-8 text-[var(--muted)]">
              {id
                ? 'Teknologi yang sudah saya pakai di proyek dan saat magang, dikelompokkan berdasarkan perannya dalam sebuah aplikasi.'
                : 'Technologies I have used in projects and during my internship, grouped by the role they play in an application.'}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 80}>
              <article className="h-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 transition hover:-translate-y-1 hover:border-[var(--accent)]/40">
                <span className="font-mono text-xs text-[var(--accent)]">
                  0{index + 1}
                </span>

                <h3 className="mt-6 text-xl font-semibold">
                  {group.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {id ? group.description.id : group.description.en}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-[var(--line)] bg-[var(--background)] px-3 py-2 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-dashed border-[var(--line)] p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-mono text-xs tracking-widest text-[var(--muted)]">
                {id ? 'SEDANG DIPELAJARI' : 'CURRENTLY LEARNING'}
              </span>
              <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
                {id
                  ? 'Masih tahap belajar, tapi sudah saya pakai langsung untuk membangun portfolio ini.'
                  : 'Still learning, but already put to work building this portfolio.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-[var(--surface-soft)] px-3 py-2 text-sm text-[var(--accent)]"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}