import { AuthButton } from './client'
import { supabase } from '../../services/supabase'

export async function AuthButtonServer() {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  return <AuthButton session={session} />
}
