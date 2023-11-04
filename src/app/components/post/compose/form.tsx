'use client'

import { Avatar } from '@nextui-org/react'
import { ComposeButtonForm } from './button'
import { useRef } from 'react'

interface ComposeFormProps {
  addPost: (formData: FormData) => Promise<void>
  userAvatarUrl: string
}

export function ComposeForm({ addPost, userAvatarUrl }: ComposeFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  return (
    <form
      action={async (formData) => {
        await addPost(formData)
        formRef.current?.reset()
      }}
      className="flex flex-row p-3 border-b border-white/20"
      ref={formRef}
    >
      <Avatar radius="full" size="md" src={userAvatarUrl} />
      <div className="flex flex-1 flex-col gap-y-4 pl-4">
        <textarea
          className="w-full text-2xl bg-black placeholder-gray-500 p-2"
          name="content"
          placeholder="¿Qué estás pensando?"
          rows={4}
        ></textarea>
        <ComposeButtonForm />
      </div>
    </form>
  )
}
