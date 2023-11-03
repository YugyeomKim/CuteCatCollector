"use client"

import { useRouter } from 'next/navigation'

export default function GoBackButton() {
  const router = useRouter()
  
  return (
    <button
      type="button"
      className="hover:bg-neutral-100 p-2 rounded-full -ml-2 mb-5"
      onClick={() => router.back()}
    >
      <img src="/arrow-back.svg" alt="back" className="w-5 h-5" />
    </button>
  )
}
