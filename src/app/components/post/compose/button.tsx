'use client'

import { useFormStatus } from 'react-dom'

export function ComposeButtonForm() {
  const { pending } = useFormStatus()
  return (
    <button
      className="bg-sky-500 text-sm font-bold rounded-full px-5 py-2 self-end"
      disabled={pending}
      type="submit"
    >
      {pending ? 'Posteando...' : 'Postear'}
    </button>
  )
}
