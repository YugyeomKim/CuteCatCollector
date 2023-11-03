'use client'

import { useState, useRef, useEffect, use } from 'react'

export default function CommentForm({
  postId,
  replyingProp,
  setComments,
}: {
  postId: string
  replyingProp?: COMMENT
  setComments: React.Dispatch<React.SetStateAction<COMMENT[]>>
}) {
  const [content, setContent] = useState('')
  const [authorBlankAlert, setAuthorBlankAlert] = useState(false)
  const [replying, setReplying] = useState<COMMENT | undefined>(replyingProp)

  const authorRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setReplying(replyingProp)
  }, [replyingProp])

  useEffect(() => {
    contentRef.current!.style.height = 'auto'
    contentRef.current!.style.height = contentRef.current!.scrollHeight + 'px'
  }, [content])

  const handleRowChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const postComment = () => {
    const author = authorRef.current?.value
    const content = contentRef.current?.value

    if (!author) {
      setAuthorBlankAlert(true)
      return
    }

    fetch(`http://localhost:3001/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        author,
        content,
        replyTo: replying?.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)

        setComments((prev) => [...prev, res])

        authorRef.current!.value = ''
        setContent('')
        setReplying(undefined)
        setAuthorBlankAlert(false)
      })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postComment()
  }

  const handleReplyingClick = () => {
    setReplying(undefined)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      postComment()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start mt-5">
      {replying && (
        <div
          className="text-xs space-x-1 px-2 py-1 rounded-md hover:bg-neutral-100"
          onClick={handleReplyingClick}
        >
          <span className="text-blue-600">↪@{replying.author}</span>
          <span className="inline-block text-neutral-500 max-w-md whitespace-nowrap overflow-clip overflow-ellipsis">
            {replying.content}
          </span>
        </div>
      )}
      <label htmlFor="author" className="text-xs font-bold p-1">
        Name
      </label>
      <input
        type="text"
        name="author"
        id="author"
        placeholder="Cat Lover 🥰"
        maxLength={20}
        ref={authorRef}
        className={`${
          authorBlankAlert && 'border-b-2 border-red-500'
        } focus:outline-none mb-2 p-1 focus:border-b-2 border-neutral-500`}
      />
      {authorBlankAlert && (
        <span className="text-xs text-red-500 -mt-2">
          Please enter your nickname.
        </span>
      )}

      <label htmlFor="content" className="text-xs font-bold p-1">
        Content
      </label>
      <div className="flex flex-row justify-center mb-5 gap-3 w-full focus-within:border-b-2 border-neutral-500">
        <textarea
          name="content"
          id="content"
          placeholder="Meow Meow Meow"
          value={content}
          onChange={handleRowChange}
          ref={contentRef}
          rows={1}
          onKeyDown={handleKeyDown}
          className="focus:outline-none w-full p-1 resize-none flex-1"
        />

        <button
          type="submit"
          className={`${
            content || 'text-opacity-0'
          } text-blue-600 font-semibold text-sm`}
          disabled={!content}
        >
          Submit
        </button>
      </div>
    </form>
  )
}
