'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Interactions({
  id,
  like,
  fromList = false,
}: {
  id: string
  like: number
  fromList?: boolean
}) {
  const [liked, setLiked] = useState(false)

  const likeClickHandler = () => {
    setLiked(!liked)

    fetch('http://localhost:3001/posts/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        like: liked ? like : like + 1,
      }),
    })

  }

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={likeClickHandler}
          className="hover:bg-neutral-100 p-2 rounded-full"
        >
          {liked ? (
            <img src="/heart-fill.svg" alt="heart" className="w-5 h-5" />
          ) : (
            <img src="/heart-blank.svg" alt="heart" className="w-5 h-5" />
          )}
        </button>
        <Link
          href={fromList ? '/post/' + id + '#comments' : '#comments'}
          className="hover:bg-neutral-100 p-2 rounded-full"
          replace={!fromList}
        >
          <img src="/speech-bubble.svg" alt="comment" className="w-5 h-5" />
        </Link>
      </div>

      <div className="mb-7 text-sm text-neutral-500 font-medium">
        {liked ? like + 1 : like} people fell in LOVE
      </div>
    </>
  )
}
