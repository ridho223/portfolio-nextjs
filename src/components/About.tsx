'use client'

import Reveal from './Reveal'
import { useSite } from './SiteProvider'

export default function About() {
  const { language } = useSite()
  const id = language === 'id'

  return (
    <section
      id="about"
      className="relative scroll-mt-24 px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="mb-4 text-sm font-medium tracking-wide text-[var(--accent)]">
                {id ? 'TENTANG SAYA' : 'ABOUT ME'}
              </p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                {id ? 'Dari SMK RPL ke dunia backend.' : 'From vocational school to backend.'}
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-[var(--muted)]">
                {id
                  ? 'Saya mulai mengenal rekayasa perangkat lunak dari SMK, lalu magang sekitar enam bulan sebagai backend/web developer di Mascitra Teknologi. Sekarang saya melanjutkan D3 Teknologi Informasi di Universitas Brawijaya sambil terus membangun proyek.'
                  : 'I started in software engineering at a vocational high school, then spent about six months as a backend/web developer intern at Mascitra Teknologi. Now I am pursuing a Diploma in Information Technology at Brawijaya University while continuing to build projects.'}
              </p>

              <p className="mt-5 leading-8 text-[var(--muted)]">
                {id
                  ? 'Yang paling menarik bagi saya ada di balik layar: merancang database, menyusun logika aplikasi, dan memastikan setiap bagian sistem terhubung dengan benar sampai benar-benar bisa dipakai.'
                  : 'What interests me most happens behind the scenes: designing databases, structuring application logic, and making sure every part of the system connects and works as intended.'}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-12 border-t border-[var(--line)] pt-10 md:grid-cols-2">
          <Reveal>
            <div>
              <span className="font-mono text-xs tracking-widest text-[var(--muted)]">
                {id ? 'PENDIDIKAN' : 'EDUCATION'}
              </span>

              <div className="mt-7 border-l border-[var(--line)] pl-6">
                <span className="text-xs text-[var(--accent)]">2026 — {id ? 'Sekarang' : 'Present'}</span>
                <h3 className="mt-2 text-xl font-semibold">
                  Universitas Brawijaya
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  D3 Teknologi Informasi · Fakultas Vokasi
                </p>
              </div>

              <div className="mt-8 border-l border-[var(--line)] pl-6">
                <span className="text-xs text-[var(--accent)]">2022 — 2025</span>
                <h3 className="mt-2 text-xl font-semibold">
                  SMK Negeri Pasirian
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {id ? 'Rekayasa Perangkat Lunak' : 'Software Engineering'}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <span className="font-mono text-xs tracking-widest text-[var(--muted)]">
                {id ? 'PENGALAMAN' : 'EXPERIENCE'}
              </span>

              <div className="mt-7 border-l border-[var(--line)] pl-6">
                <span className="text-xs text-[var(--accent)]">
                  {id ? 'Sekitar 6 bulan' : 'Approximately 6 months'}
                </span>
                <h3 className="mt-2 text-xl font-semibold">
                  Mascitra Teknologi
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Backend / Web Developer Intern
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {id
                    ? 'Ikut mengembangkan aplikasi web dengan Laravel, PHP, dan MySQL, mulai dari fitur backend sampai pengelolaan database.'
                    : 'Helped develop web applications with Laravel, PHP, and MySQL, from backend features to database management.'}
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                <span className="font-mono text-xs text-[var(--accent)]">
                  {id ? 'FOKUS SAAT INI' : 'CURRENT FOCUS'}
                </span>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {id
                    ? 'Memperdalam backend (Laravel, database, REST API) sambil belajar React dan Next.js, supaya bisa membangun produk dari sisi server sampai tampilan.'
                    : 'Going deeper into backend (Laravel, databases, REST APIs) while learning React and Next.js, so I can build products from server to interface.'}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}