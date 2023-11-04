import { ComposeForm } from './form'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

interface ComposePostProps {
  userAvatarUrl: string
}

export function ComposePost({ userAvatarUrl }: ComposePostProps) {
  const addPost = async (formData: FormData) => {
    'use server'

    const content = formData.get('content')
    if (content === null) return
    const supabase = createServerActionClient({ cookies })

    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (user === null) return

    await supabase.from('posts').insert({
      content,
      user_id: user.id
    })

    revalidatePath('/')
  }

  return <ComposeForm addPost={addPost} userAvatarUrl={userAvatarUrl} />
}
