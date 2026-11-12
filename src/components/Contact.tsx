'use client'

import { useSite } from './SiteProvider'

const contacts = [
  {
    name: 'GitHub',
    detail: { id: 'Lihat kode dan repositori saya', en: 'Browse my code and repositories' },
    value: '@ridho223',
    href: 'https://github.com/ridho223',
    icon: 'GH',
  },
  {
    name: 'WhatsApp',
    detail: { id: 'Ngobrol langsung', en: 'Chat directly' },
    value: '+62 85854771641',
    href: 'https://wa.me/6285854771641',
    icon: 'WA',
  },
  {
    name: 'Instagram',
    detail: { id: 'Keseharian dan update singkat', en: 'Daily life and quick updates' },
    value: '@amsfrdo_',
    href: 'https://instagram.com/amsfrdo_',
    icon: 'IG',
  },
  {
    name: 'TikTok',
    detail: { id: 'Video singkat', en: 'Short videos' },
    value: 'ridoooo.s',
    href: 'https://www.tiktok.com//@ridooooo.s',
    icon: 'TK',
  },
  {
    name: 'LinkedIn',
    detail: { id: 'Profil profesional', en: 'Professional profile' },
    value: 'Saifur Ridho',
    href: 'https://www.linkedin.com/in/saifur-ridho-682722421?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    icon: 'IN',
  },
  {
    name: 'Email',
    detail: { id: 'Untuk urusan magang dan kerja sama', en: 'For internships and collaborations' },
    value: 'saifuridho@student.ub.ac.id',
    href: 'mailto:saifuridho@student.ub.ac.id',
    icon: '@',
  },
]

export default function Contact() {
  const { language } = useSite()
  const isID = language === 'id'

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28"
    >
      <div className="mb-12 max-w-2xl">
        <p className="mb-4 text-sm font-medium tracking-wide text-[var(--accent)]">
          {isID ? 'HUBUNGI SAYA' : 'GET IN TOUCH'}
        </p>

        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {isID ? 'Ayo ngobrol.' : 'Let’s talk.'}
        </h2>

        <p className="mt-5 leading-7 text-[var(--muted)]">
          {isID
            ? 'Saya terbuka untuk magang, kolaborasi proyek, atau sekadar diskusi soal backend dan web development. Kirim pesan singkat saja sudah cukup, nanti saya balas.'
            : 'I am open to internships, project collaborations, or just a chat about backend and web development. A short message is all it takes, and I will get back to you.'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => {
          const content = (
            <>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line)] bg-blue-500/10 text-sm font-semibold text-[var(--accent)]">
                  {contact.icon}
                </span>

                <span className="text-[var(--muted)] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)]">
                  ↗
                </span>
              </div>

              <div className="mt-7">
                <h3 className="text-lg font-semibold">
                  {contact.name}
                </h3>

                <p className="mt-1 text-sm text-[var(--muted)]">
                  {isID ? contact.detail.id : contact.detail.en}
                </p>

                <p className="mt-4 text-sm font-medium text-[var(--accent)]">
                  {contact.value ?? (isID ? 'Segera hadir' : 'Coming soon')}
                </p>
              </div>
            </>
          )

          return contact.href ? (
            <a
              key={contact.name}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/[0.04]"
            >
              {content}
            </a>
          ) : (
            <div
              key={contact.name}
              className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-6 opacity-65"
            >
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}