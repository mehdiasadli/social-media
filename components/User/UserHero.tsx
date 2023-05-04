import { FC, use } from 'react'
import Image from 'next/image'
import useUser from '@/hooks/useUser'
import Avatar from '../ui/Avatar'

interface UserHeroProps {
  userId: string
}

const UserHero: FC<UserHeroProps> = ({ userId }) => {
  const { data: user } = useUser(userId)

  return (
    <div>
      <div className='bg-neutral-700 h-44 relative'>
        {user?.coverImage && (
          <Image fill src={user.coverImage} alt='Cover Image' style={{ objectFit: 'cover' }} />
        )}
        <div className='absolute -bottom-16 left-4'>
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  )
}

export default UserHero
