import { PostCard } from './post-card'

interface PostListProps {
  posts: any[] | null
}

export function PostList({ posts }: PostListProps) {
  return (
    <section className="flex flex-col gap-5">
      {posts?.map((post) => (
        <PostCard
          avatarUrl={post.user.avatar_url}
          content={post.content}
          key={post.id}
          userFullName={post.user.name}
          userName={post.user.user_name}
        />
      ))}
    </section>
  )
}
