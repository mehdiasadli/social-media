import useCurrentUser from '@/hooks/useCurrentUser'
import useNotifications from '@/hooks/useNotifications'
import { FC, useEffect } from 'react'
import { BsTwitter } from 'react-icons/bs'

interface NotificationFeedProps {}

const NotificationFeed: FC<NotificationFeedProps> = ({}) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
  const { data: notifications = [] } = useNotifications(currentUser?.id)

  useEffect(() => {
    mutateCurrentUser()
  }, [mutateCurrentUser])

  if (notifications.length === 0) {
    return <div className='text-neutral-600 text-center p-6 text-xl'>No notifications</div>
  }

  return (
    <div className='flex flex-col'>
      {notifications.map((n: Record<string, any>) => (
        <div
          key={n.id}
          className='flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800'
        >
          <BsTwitter color='white' size={32} />
          <p className='text-white'>{n.body}</p>
        </div>
      ))}
    </div>
  )
}

export default NotificationFeed
