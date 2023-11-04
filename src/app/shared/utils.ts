export function formatPosts(posts: any[]): any[] {
  return (
    posts?.map((post) => ({
      ...post,
      user: Array.isArray(post.user) ? post.user[0] : post.user
    })) ?? []
  )
}
