import Header from '@/components/Header'
import NotificationFeed from '@/components/Notification/NotificationFeed'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { FC } from 'react'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = ({}) => {
  return (
    <>
      <Header label='Notifications' showBackArrow />
      <NotificationFeed />
    </>
  )
}

export default Notifications
