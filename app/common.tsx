type COMMENT = {
  id: string
  postId: string
  content: string
  author: string
  replyTo?: string
}

type POST = {
  id: string
  title: string
  image: string
  like: number
  content: string
}