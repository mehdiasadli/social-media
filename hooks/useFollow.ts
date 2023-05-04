import { useCallback, useMemo } from 'react'
import useUser from '@/hooks/useUser'
import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from './useLoginModal'
import toast from 'react-hot-toast'
import axios from 'axios'

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
  const { mutate: mutateUser } = useUser(userId)
  const loginModal = useLoginModal()

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || []
    return list.includes(userId)
  }, [userId, currentUser?.followingIds])

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      let request

      if (isFollowing) {
        request = () => axios.delete(`/api/follow`, { params: { userId } })
      } else {
        request = () => axios.post('/api/follow', { userId })
      }

      await request()
      mutateUser()
      mutateCurrentUser()
      toast.success('Successfully updated')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [currentUser, isFollowing, userId, mutateUser, mutateCurrentUser, loginModal])

  return { isFollowing, toggleFollow }
}

export default useFollow
