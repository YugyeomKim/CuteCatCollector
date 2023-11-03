'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Interactions from './Interactions'

export default function PostCard({ post }: { post: POST }) {
  const [liked, setLiked] = useState(false)
  const [commentsCount, setCommentsCount] = useState(0)

  const { id, title, image, content, like } = post

  useEffect(() => {
    fetch('http://localhost:3001/comments/?postId=' + id, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setCommentsCount(data.length))
      .then(() => {
        // Scroll to comments if URL has #comments
        if (window.location.hash === '#comments') {
          const commentsElement = document.getElementById('comments')
          if (commentsElement) {
            commentsElement.scrollIntoView()
          }
        }
      })
  }, [])

  return (
    <div>
      <Link href={'/post/' + id}>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <img src={image} alt={title} className="rounded-sm mb-1" />
      </Link>

      <Interactions id={id} like={like} fromList />

      <Link
        href={'/post/' + id}
        className="text-sm line-clamp-3 my-2 hover:underline"
      >
        {content}
      </Link>

      <Link
        href={'/post/' + id + '#comments'}
        className="mb-3 text-sm text-neutral-500 hover:text-neutral-400"
      >
        {commentsCount} comments
      </Link>

      <hr className="my-5 h-px border-t-0 bg-neutral-200" />
    </div>
  )
}
