import { type Post } from '../types/post'
import { PostCard } from './post-card'

interface PostListProps {
  posts: Post[] | null
}

export function PostList({ posts }: PostListProps) {
  return (
    <>
      {posts?.map((post) => (
        <PostCard
          avatarUrl={post.user.avatar_url}
          content={post.content}
          key={post.id}
          userFullName={post.user.name}
          userName={post.user.user_name}
        />
      ))}
    </>
  )
}
