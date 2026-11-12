'use client'

import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import { useSite } from './SiteProvider'

export default function Projects() {
  const { language } = useSite()
  const id = language === 'id'

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              
              <p className="mb-4 text-sm font-medium tracking-wide text-[var(--accent)]">
                {id ? 'PROYEK PILIHAN' : 'SELECTED WORK'}
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                {id ? 'Proyek yang pernah saya bangun.' : 'Projects I have built.'}
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-[var(--muted)]">
                {id
                  ? 'Dari sistem pemesanan catering sampai website portfolio ini, setiap proyek adalah bagian dari proses saya belajar membangun aplikasi web.'
                  : 'From a catering ordering system to this very portfolio, each project is part of how I am learning to build web applications.'}
              </p>
            </div>

            <a
              href="https://github.com/ridho223"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--accent)] hover:underline"
            >
              {id ? 'Lihat semua di GitHub ↗' : 'See all on GitHub ↗'}
            </a>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 80}>
              <ProjectCard
                title={project.title}
                category={project.category}
                description={
                  id ? project.description : project.descriptionEn
                }
                tags={project.tech}
                link={project.github}
                number={`0${index + 1}`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}