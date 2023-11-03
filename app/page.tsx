import PostCard from './PostCard'

export default async function Home() {
  const resp = await fetch('http://localhost:3001/posts', { cache: "no-store" })
  const posts: POST[] = await resp.json()

  return (
    <section className="px-20 py-10 flex flex-col items-center">
      <div className="flex-col space-y-10 w-[30rem]">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </section>
  )
}
