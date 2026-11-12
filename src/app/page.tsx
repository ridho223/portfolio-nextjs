'use client'

import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Scene3DWrapper from '@/components/Scene3DWrapper'
import { useSite } from '@/components/SiteProvider'
import InteractiveBackground from '@/components/InteractiveBackground'

export default function Home() {
  const { language } = useSite()
  const isID = language === 'id'

  return (
    <main className="site-background relative min-h-screen text-[var(--foreground)] transition-colors duration-300">
      <InteractiveBackground />
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-24 pt-32"
      >
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

          {/* HERO CONTENT */}
          <div className="relative z-10">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 px-4 py-2 text-xs text-[var(--muted)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              {isID
                ? 'Mahasiswa Teknologi Informasi · Universitas Brawijaya'
                : 'Information Technology Student · Brawijaya University'}
            </div>

            <p className="mb-4 font-mono text-sm tracking-wide text-[var(--accent)]">
              {isID ? 'Halo, saya' : "Hello, I'm"}
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Ahmad Saifur
              <span className="block text-[var(--muted)]">
                Ridho<span className="text-[var(--accent)]">.</span>
              </span>
            </h1>

            <h2 className="mt-7 text-xl font-medium tracking-tight sm:text-2xl">
              Backend Developer
              <span className="ml-2 text-[var(--muted)]">/ Laravel &amp; PHP</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-8 text-[var(--muted)] sm:text-base">
              {isID
                ? 'Saya membangun aplikasi web menggunakan PHP, Laravel, dan MySQL. Memiliki pengalaman mengembangkan fitur backend, mengelola database, serta membangun REST API. Saat ini saya terus mengembangkan kemampuan di bidang web development.'
                : 'I build web applications using PHP, Laravel, and MySQL. I have experience developing backend features, managing databases, and building REST APIs. I am continuously improving my web development skills.'}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition hover:-translate-y-1 hover:opacity-85"
              >
                {isID ? 'Lihat Proyek' : 'View Projects'} ↗
              </a>

              <a
                href="#contact"
                className="rounded-full border border-[var(--line)] bg-[var(--surface)]/60 px-6 py-3 text-sm font-medium backdrop-blur transition hover:-translate-y-1 hover:border-[var(--accent)]"
              >
                {isID ? 'Hubungi Saya' : 'Contact Me'}
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[var(--line)] pt-6 text-xs font-mono text-[var(--muted)]">
              <span>PHP</span>
              <span className="text-[var(--accent)]">/</span>
              <span>Laravel</span>
              <span className="text-[var(--accent)]">/</span>
              <span>MySQL</span>
              <span className="text-[var(--accent)]">/</span>
              <span>REST API</span>
              <span className="text-[var(--accent)]">/</span>
              <span>Git</span>
            </div>
          </div>

          {/* 3D LANYARD */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[110px]" />

            <div className="relative z-10">
              <Scene3DWrapper />
            </div>

            {/* label ditaruh di bawah canvas (bukan absolute) supaya tidak menimpa kartu */}
            <p className="relative z-10 mt-2 text-center text-[10px] font-mono tracking-[0.2em] text-[var(--muted)]">
              {isID ? 'IDENTITY CARD · 2026' : 'PERSONAL IDENTITY · 2026'}
            </p>
          </div>
        </div>

        {/* SCROLL INDICATOR: cuma muncul kalau layar cukup tinggi, biar tidak tabrakan dengan konten */}
        <a
          href="#about"
          aria-label="Scroll to About"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-[var(--muted)] transition hover:text-[var(--accent)] [@media(min-height:860px)_and_(min-width:768px)]:flex"
        >
          <span>{isID ? 'GULIR KE BAWAH' : 'SCROLL TO EXPLORE'}</span>
          <span className="h-10 w-px bg-gradient-to-b from-[var(--accent)] to-transparent" />
        </a>
      </section>

      {/* SECTION DIVIDERS */}
      <div className="section-divider" />
      <About />

      <div className="section-divider" />
      <Skills />

      <div className="section-divider" />
      <Projects />

      <div className="section-divider" />
      <Contact />

      <footer className="relative border-t border-[var(--line)] px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-[var(--muted)] sm:flex-row">
          <p>© 2026 Ahmad Saifur Ridho</p>
          <p className="font-mono">
            {isID ? 'Dibuat dengan Next.js & Three.js' : 'Built with Next.js & Three.js'}
          </p>
        </div>
      </footer>
    </main>
  )
}