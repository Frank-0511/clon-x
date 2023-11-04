'use client'

import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from '@nextui-org/react'
import { IconHeart, IconMessageCircle, IconRepeat } from '@tabler/icons-react'

import Link from 'next/link'
import styles from './styles.module.css'

interface PostCardProps {
  userFullName: string
  userName: string
  avatarUrl: string
  content: string
}

export function PostCard({
  userFullName,
  userName,
  avatarUrl,
  content
}: PostCardProps) {
  return (
    <Card className={styles.card}>
      <CardHeader className="justify-between">
        <div className="flex gap-x-2">
          <Link href={`/${userName}`}>
            <Avatar radius="full" size="md" src={avatarUrl} />
          </Link>
          <div className={styles.userInfo}>
            <h4 className={styles.userFullName}>{userFullName}</h4>
            <h5 className={styles.userName}>@{userName}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className={styles.cardBody}>
        <p>{content}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <button className="bg-transparent">
          <IconMessageCircle className="h-4 w-4" />
        </button>
        <button className="bg-transparent">
          <IconHeart className="h-4 w-4" />
        </button>
        <button className="bg-transparent">
          <IconRepeat className="h-4 w-4" />
        </button>
      </CardFooter>
    </Card>
  )
}
