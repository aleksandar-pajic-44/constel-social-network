import '../home.scss';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

import PostActionButton from './actionButton';
import PostAuthorDetails from './authorDetails';
import PostTimePosted from './timePosted';
import PostCommentsModal from './commentsModal';

import { Author, PostComment } from '../models/post';
import { Account } from '@/app/login/models/login';

export default function FeedPost({
  userDetails,
  author,
  timePosted,
  imageUrl,
  description,
  likes,
  comments,
  liked,
  postId,
  postComments,
  commentsLoaded,
  fetchPostComments,
  toggleLikeStatus,
  onCreateCommentSubmit,
  onPostDeleteSubmit
}: {
  userDetails: Account | undefined,
  author: Author,
  timePosted: string,
  imageUrl?: string,
  description: string,
  likes: number,
  comments: number,
  liked: boolean,
  postId: string,
  postComments: PostComment[],
  commentsLoaded: boolean,
  fetchPostComments: (postId: string) => void,
  toggleLikeStatus: (postId: string, isLiked: boolean) => void,
  onCreateCommentSubmit: (postId: string, text: string) => void,
  onPostDeleteSubmit: (postId: string, commentId: string) => void
}) {

  // State to track liked status
  const [isPostLiked, setIsPostLiked] = useState<boolean>(liked);
  const [likesCount, setLikesCount] = useState<number>(likes);
  const [commentsCount, setCommentsCount] = useState<number>(comments);
  const [updatedPostComments, setUpdatedPostComments] = useState<PostComment[]>(postComments);

  // Effect to update the child component when the postComponents prop changes
  useEffect(() => {
    setUpdatedPostComments(postComments);
  }, [postComments]);

  const likesActionButton = (): React.ReactNode => {
    return (
      <PostActionButton
        count={likesCount}
        iconType={faHeart}
        activeStatus={isPostLiked}
        onButtonClick={() => {
          toggleLikeStatus(postId, isPostLiked);

          // Update post isLiked state and count
          setIsPostLiked(!isPostLiked);
          setLikesCount((prevLikes: number) => isPostLiked ? prevLikes - 1 : prevLikes + 1);
        }}
      />
    )
  }

  return (
    <div className="home__main__feed__post card">
      {/* Post header */}
      <div className="home__main__feed__post__header">
        {/* Author Details */}
        <PostAuthorDetails
          username={author?.username}
          fullName={author?.full_name}
          picture={author?.picture}
        />

        {/* Time posted  */}
        <PostTimePosted timePosted={timePosted}/>
      </div>

      {/* Post body */}
      <div className="home__main__feed__post__body">
        {/* Show post image if available */}
        { imageUrl && (
          <Image
            id={`${author?.username}-post-image`}
            src={imageUrl}
            priority={true}
            fetchPriority={'high'}
            width={668}
            height={285}
            className='post__image'
            aria-label={`${author?.full_name} post image`}
            aria-labelledby={`${author?.username}PostImage`}
            alt={`${author?.full_name} post image`}
          />
        )}

        {/* Post description */}
        <p className="post__description">{description}</p>

        <div className="post__actions">
          {likesActionButton()}

          <PostCommentsModal
            key={postId}
            userDetails={userDetails}
            author={author}
            timePosted={timePosted}
            imageUrl={imageUrl}
            description={description}
            comments={commentsCount}
            postId={postId}
            postComments={updatedPostComments}
            commentsLoaded={commentsLoaded}
            onCreateCommentSubmit={(postId: string, text: string) => {
              onCreateCommentSubmit(postId, text);
              // Set new comment count
              setCommentsCount((prevCommentsCount: number) => prevCommentsCount + 1);
            }}
            fetchPostComments={(postId: string) => {
              fetchPostComments(postId);
            }}
            onPostDeleteSubmit={(postId: string, commentId: string) => {
              onPostDeleteSubmit(postId, commentId);

              // Set new comment count
              setCommentsCount((prevCommentsCount: number) => prevCommentsCount - 1);
            }}
          >
            {likesActionButton()}

            <PostActionButton
              count={commentsCount}
              iconType={faComment}
            />
          </PostCommentsModal>
        </div>
      </div>
    </div>
  )
}
