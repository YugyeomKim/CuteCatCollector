"use client"

import { useRouter } from "next/navigation"

export default async function Random() {
  const router = useRouter()

  const res = await fetch('http://localhost:3001/posts', { cache: "no-store" })
  const posts: POST[] = await res.json()
  const randomIdx = posts[Math.floor(Math.random() * posts.length)].id

  router.push(`/post/${randomIdx}`)
}