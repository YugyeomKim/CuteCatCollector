export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-20 py-10 flex flex-col items-center">{children}</section>
  )
}