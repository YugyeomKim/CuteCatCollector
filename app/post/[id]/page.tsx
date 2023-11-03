import Comments from './Comments'
import Interactions from '@/app/Interactions'
import GoBackButton from './GoBackButton'

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = params

  const res = await fetch('http://localhost:3001/posts/' + id, { cache: "no-store" })
  const post: POST = await res.json()

  const { title, image, content, like } = post

  return (
    <div>
      <GoBackButton />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <img src={image} alt={title} className="rounded-sm mb-1" />

      <Interactions id={id} like={like} />

      <div className="text-sm mb-10 whitespace-pre-wrap">{content}</div>

      <Comments id={id} />

      <hr className="my-5 h-px border-t-0 bg-neutral-200" />
    </div>
  )
}
