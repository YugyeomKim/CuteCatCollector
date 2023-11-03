import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Ad from './Ad'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CCC, The Greatest Cute Cat Collector App',
  description: 'You can collect cute cats here.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>
        <aside
          className="fixed top-0 left-0 z-40 w-64 h-screen px-7 py-10 bg-slate-50 border-r"
          aria-label="Side bar"
        >
          <div className="mb-7">
            <Link href="/">
              <h1 className="font-bold text-3xl -tracking-[.27em]">CCC</h1>
              <h2>Cute Cat Collector🎩</h2>
            </Link>
          </div>

          <ul className="space-y-3">
            <Link href="/">
              <li className="sidebar_button">🐈 List</li>
            </Link>
            <Link href="/breed">
              <li className="sidebar_button">🐈‍⬛ Breed</li>
            </Link>
            <Link href="/random">
              <li className="sidebar_button">🙀 Random Cats</li>
            </Link>
          </ul>
        </aside>

        <div className="ml-64 mr-[22rem] h-screen">{children}</div>

        <div className="fixed top-0 right-0 z-30 h-screen px-7 py-10">
          <Ad />
        </div>
      </body>
    </html>
  )
}
