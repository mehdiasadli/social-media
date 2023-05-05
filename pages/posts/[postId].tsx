import Form from '@/components/Form'
import Header from '@/components/Header'
import CommentFeed from '@/components/Post/CommentFeed'
import PostItem from '@/components/Post/PostItem'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { ClipLoader } from 'react-spinners'

interface PostViewProps {}

const PostView: FC<PostViewProps> = ({}) => {
  const router = useRouter()
  const { postId } = router.query

  const { data: post, isLoading } = usePost(postId as string)

  if (isLoading || !post) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={50} />
      </div>
    )
  }

  return (
    <>
      <Header label='Tweet' showBackArrow />
      <PostItem data={post} />
      <Form postId={postId as string} isComment placeholder='Tweet your reply' />
      <CommentFeed comments={post?.comments} />
    </>
  )
}

export default PostView
