'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

export default function Post() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [titleBlankAlert, setTitleBlankAlert] = useState(false)
  const [imageBlankAlert, setImageBlankAlert] = useState(false)
  const [contentBlankAlert, setContentBlankAlert] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const handleCancleButtonClick = () => {
    router.back()
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const title = titleRef.current!.value
    const image = imageRef.current!.value
    const content = contentRef.current!.value

    if (!title) {
      setTitleBlankAlert(true)
    } else setTitleBlankAlert(false)
    if (!image) {
      setImageBlankAlert(true)
    } else setImageBlankAlert(false)
    if (!content) {
      setContentBlankAlert(true)
    } else setContentBlankAlert(false)

    if (!title || !image || !content) return

    fetch(`http://localhost:3001/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        image,
        like: 0,
        content,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        router.push('/post/' + res.id)
      })
  }

  return (
    <>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>

      <form
        onSubmit={handleSubmit}
        className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
      >
        <input
          className={`title bg-gray-100 border ${
            titleBlankAlert && 'border-red-500'
          } border-gray-300 p-2 outline-none`}
          spellCheck="false"
          placeholder="Title"
          type="text"
          maxLength={60}
          ref={titleRef}
        />
        {titleBlankAlert && (
          <span className="text-xs text-red-500">Fill the title</span>
        )}
        <input
          className={`image bg-gray-100 border ${
            imageBlankAlert && 'border-red-500'
          } border-gray-300 p-2 mt-4 outline-none`}
          spellCheck="false"
          placeholder="Image URL"
          type="text"
          ref={imageRef}
        />
        {imageBlankAlert && (
          <span className="text-xs text-red-500">Fill the image</span>
        )}
        <textarea
          className={`content bg-gray-100 p-3 h-72 border ${
            contentBlankAlert && 'border-red-500'
          } border-gray-300 mt-4 outline-none resize-none`}
          spellCheck="false"
          placeholder="Describe your cat"
          maxLength={500}
          onChange={handleTextareaChange}
          ref={contentRef}
        ></textarea>
        {contentBlankAlert && (
          <span className="text-xs text-red-500">Fill the description</span>
        )}

        <div className="count ml-auto mb-5 text-gray-400 text-xs font-semibold">
          {content.length}/500
        </div>
        <div className="buttons flex">
          <div
            onClick={handleCancleButtonClick}
            className="btn border border-gray-300 rounded-sm p-1 px-4 font-semibold cursor-pointer text-gray-500 hover:bg-gray-100 ml-auto"
          >
            Cancel
          </div>
          <button
            type="submit"
            className="btn border border-indigo-500 rounded-sm p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 hover:bg-indigo-600"
          >
            Post
          </button>
        </div>
      </form>
    </>
  )
}
