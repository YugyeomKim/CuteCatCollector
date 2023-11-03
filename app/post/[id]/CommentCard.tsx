import Link from 'next/link'

export default function CommentCard({
  comment,
  replyComment,
  onClick,
}: {
  comment: COMMENT
  replyComment: COMMENT | undefined
  onClick: () => void
}) {
  const { id, content, author } = comment

  return (
    <div
      id={`comment${id}`}
      className="hover:bg-neutral-100 px-4 mb-7 rounded-r-md border-l-2"
      onClick={onClick}
    >
      {replyComment && (
        <Link
          href={`#comment${replyComment.id}`}
          className="text-xs space-x-1"
          replace
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <span className="text-blue-600">@{replyComment.author}</span>
          <span className="inline-block text-neutral-500 max-w-md whitespace-nowrap overflow-clip overflow-ellipsis">
            {replyComment.content}
          </span>
        </Link>
      )}
      <div className="text-sm font-semibold">{author}</div>
      <div className="text-sm my-2 whitespace-pre-wrap">{content}</div>
    </div>
  )
}
