import type { Metadata } from 'next'
import { SiteProvider } from '@/components/SiteProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ahmad Saifur Ridho | Developer Portfolio',
  description:
    'Portfolio Ahmad Saifur Ridho, Information Technology student focusing on backend web development.',
}

// Set tema dari localStorage SEBELUM halaman tampil, supaya tidak
// "kedip" dark -> light saat user terakhir memilih mode light.
const themeInit = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  )
}