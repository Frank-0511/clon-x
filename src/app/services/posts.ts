import { supabase } from './supabase'

export async function getPosts() {
  const { data } = await supabase
    .from('posts')
    .select('*, user:users(name, user_name, avatar_url)')
    .order('created_at', { ascending: false })

  return data ?? []
}
