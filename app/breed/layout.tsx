import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CCC, The Greatest Cute Cat Collector App',
  description: 'You can collect cute cats here.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-20 py-10 flex flex-col items-center">{children}</section>
  )
}