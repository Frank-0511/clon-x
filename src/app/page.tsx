import { AuthButtonServer } from './components/auth-button-server'
import { PostList } from './components/post-list'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session == null) redirect('/login')

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(name, user_name, avatar_url)')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="max-w-[600px] mx-auto border-l border-r">
        <AuthButtonServer />
        <PostList posts={posts} />
      </section>
    </main>
  )
}
