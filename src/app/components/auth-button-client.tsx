'use client'

import {
  type Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import { GithubIcon } from './icons'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/button'

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
          className="text-white bg-[#24292F] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 mr-2 mb-2"
        >
          <GithubIcon />
          Iniciar sesión con Github
        </button>
      )}
    </header>
  )
}
