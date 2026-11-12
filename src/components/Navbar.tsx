
'use client'

import { useEffect, useState } from 'react'
import { useSite } from './SiteProvider'

const navItems = [
  { id: 'about', idLabel: 'Tentang', enLabel: 'About' },
  { id: 'skills', idLabel: 'Keahlian', enLabel: 'Skills' },
  { id: 'projects', idLabel: 'Proyek', enLabel: 'Projects' },
  { id: 'contact', idLabel: 'Kontak', enLabel: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { language, setLanguage, theme, setTheme } = useSite()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    const sections = ['home', 'about', 'skills', 'projects', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[var(--line)] bg-[var(--background)]/85 shadow-lg shadow-black/[0.03] backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">

        {/* BRAND */}
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] font-mono text-sm font-bold text-[var(--accent)] transition group-hover:border-[var(--accent)]">
            SR
          </span>

          <span className="text-sm font-semibold tracking-tight">
            Saifur Ridho
            <span className="ml-1 text-[var(--accent)]">.</span>
          </span>
        </a>


      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-2 text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--foreground)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {language === 'id' ? item.idLabel : item.enLabel}

                <span
                  className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[var(--accent)] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        {/* DIVIDER */}
        <div className="hidden h-6 w-px bg-[var(--line)] md:block" />

        {/* LANGUAGE & THEME */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className="h-9 min-w-10 rounded-lg border border-[var(--line)] px-2 text-xs font-semibold text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
          >
            {language === 'id' ? 'ID' : 'EN'}
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      </div>

      {/* MOBILE NAVIGATION */}
      <div
        className={`overflow-hidden border-t border-[var(--line)] bg-[var(--background)]/95 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 py-3">
          {navItems.map((item) => {
            const isActive = active === item.id

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                className={`flex items-center justify-between border-b border-[var(--line)] py-4 text-sm transition last:border-0 ${
                  isActive
                    ? 'font-semibold text-[var(--accent)]'
                    : 'text-[var(--muted)]'
                }`}
              >
                {language === 'id' ? item.idLabel : item.enLabel}
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                )}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
