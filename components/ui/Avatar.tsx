import useUser from '@/hooks/useUser'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'

interface AvatarProps {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

const Avatar: FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter()
  const { data: user } = useUser(userId)

  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation()

      const url = `/users/${userId}`
      router.push(url)
    },
    [router, userId]
  )

  return (
    <div
      className={`${hasBorder ? 'border-4 border-black' : ''} ${isLarge ? 'h-32' : 'h-12'} ${
        isLarge ? 'w-32' : 'w-12'
      } rounded-full transition cursor-pointer relative hover:opacity-90`}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt='Avatar'
        onClick={onClick}
        src={user?.profileImage || '/images/placeholder.png'}
      />
    </div>
  )
}

export default Avatar
