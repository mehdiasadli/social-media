import Header from '@/components/Header'
import PostFeed from '@/components/Post/PostFeed'
import UserBio from '@/components/User/UserBio'
import UserHero from '@/components/User/UserHero'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { ClipLoader } from 'react-spinners'

interface UserViewProps {}

const UserView: FC<UserViewProps> = ({}) => {
  const router = useRouter()
  const { userId } = router.query
  const { data: user, isLoading } = useUser(userId as string)

  if (isLoading || !user) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={60} />
      </div>
    )
  }

  return (
    <>
      <Header label={user.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  )
}

export default UserView
