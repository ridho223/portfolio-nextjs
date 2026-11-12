export type Project = {
  title: string
  category: string
  description: string
  descriptionEn: string
  tech: string[]
  github: string
  status: string
}

export const projects: Project[] = [
  {
    title: 'Catering Hub',
    category: 'Web Application',
    description:
      'Sistem pemesanan catering berbasis web untuk Kedai Catering BangJo. Mencakup pengelolaan menu, pesanan, pelanggan, dan pembayaran lewat dashboard admin.',
    descriptionEn:
      'A web-based catering ordering system for Kedai Catering BangJo, covering menu, order, customer, and payment management through an admin dashboard.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/ridho223/catering-hub',
    status: 'Development',
  },
  {
    title: 'Pengaduan Masyarakat',
    category: 'Web Application',
    description:
      'Aplikasi web pengaduan masyarakat yang saya bangun sebagai latihan alur CRUD dan pengelolaan data.',
    descriptionEn:
      'A public complaint web application I built to practice CRUD flows and data management.',
    tech: ['Web Development'],
    github: 'https://github.com/ridho223/PengaduanMasyarakat',
    status: 'Repository',
  },
  {
    title: 'Personal Portfolio',
    category: 'Personal Website',
    description:
      'Website portfolio yang sedang kamu lihat: dibangun dengan Next.js, TypeScript, dan Tailwind CSS, lengkap dengan kartu ID 3D interaktif (Three.js), mode gelap/terang, dan dua bahasa.',
    descriptionEn:
      'The portfolio you are looking at: built with Next.js, TypeScript, and Tailwind CSS, with an interactive 3D ID card (Three.js), dark/light mode, and two languages.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
    github: 'https://github.com/ridho223/portofolio',
    status: 'Repository',
  },
]