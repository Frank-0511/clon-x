'use client'

import {
  type Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import { GithubIcon } from '../../icons'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/button'
import styles from './styles.module.css'

interface AuthButtonProps {
  session: Session | null
}

export function AuthButton({ session }: AuthButtonProps) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header>
      {session != null ? (
        <Button className="my-4" color="default" onClick={handleSignOut}>
          Cerrar sesión
        </Button>
      ) : (
        <button
          onClick={handleSignIn}
          type="button"
          className={styles.buttonSingIn}
        >
          <GithubIcon />
          Iniciar sesión con Github
        </button>
      )}
    </header>
  )
}
