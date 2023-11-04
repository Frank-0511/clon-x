import { AuthButtonServer } from './components/auth-button/server'
import { PostList } from './components/post/list'
import { formatPosts } from './shared/utils'
import { getPosts } from './services/posts'
import { getSession } from './services/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getSession()

  if (session == null) redirect('/login')

  const posts = await getPosts()

  const formattedPosts = formatPosts(posts)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-8">
      <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
        <AuthButtonServer />
        <PostList posts={formattedPosts} />
      </section>
    </main>
  )
}
