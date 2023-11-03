'use client'

import { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import CommentForm from './CommentForm'
import Link from 'next/link'

export default function Comments({ id }: { id: string }) {
  const [comments, setComments] = useState<COMMENT[]>([])
  const [replying, setReplying] = useState<COMMENT | undefined>(undefined)

  useEffect(() => {
    fetch('http://localhost:3001/comments/?postId=' + id, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setComments(data))
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

  const onClickHandler = (comment: COMMENT) => {
    setReplying(comment)
    document.getElementById('comments')?.scrollIntoView()
  }

  return (
    <>
      <div className="flex flex-col">
        {comments.map((comment, index) => {
          const replyId = comment.replyTo
          const replyComment = comments.find(
            (comment) => comment.id === replyId
          )

          return (
            <CommentCard
              key={index}
              comment={comment}
              replyComment={replyComment}
              onClick={() => onClickHandler(comment)}
            />
          )
        })}
      </div>

      <div id="comments">
        <CommentForm postId={id} replyingProp={replying} setComments={setComments} />
      </div>
    </>
  )
}
