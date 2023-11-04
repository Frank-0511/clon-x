import { AuthButtonServer } from './components/auth-button-server'
import { type Database } from './types/database'
import { PostList } from './components/post-list'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session == null) redirect('/login')

  const { data } = await supabase
    .from('posts')
    .select('*, user:users(name, user_name, avatar_url)')
    .order('created_at', { ascending: false })

  const posts =
    data?.map((post) => ({
      ...post,
      user: Array.isArray(post.user) ? post.user[0] : post.user
    })) ?? []

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-8">
      <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
        <AuthButtonServer />
        <PostList posts={posts} />
      </section>
    </main>
  )
}
