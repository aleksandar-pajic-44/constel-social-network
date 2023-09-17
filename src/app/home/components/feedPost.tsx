import '../home.scss';

import { useState } from 'react';
import Image from 'next/image';

import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

import PostActionButton from './actionButton';
import PostAuthorDetails from './authorDetails';
import PostTimePosted from './timePosted';
import PostCommentsModal from './commentsModal';

import { likePost, unlikePost } from '../services/user.service';

import { Author } from '../models/post';

export default function FeedPost({
  author,
  timePosted,
  imageUrl,
  description,
  likes,
  comments,
  liked,
  postId
}: {
  author: Author,
  timePosted: string,
  imageUrl?: string,
  description: string,
  likes: number,
  comments: number,
  liked: boolean,
  postId: string
}) {

  // State to track liked status
  const [isPostLiked, setIsPostLiked] = useState(liked);
  const [likesCount, setLikesCount] = useState(likes);

  const toggleLikeStatus = (liked: boolean) => {
    if (liked) {
      // If the post is already liked, unlike it
      unlikePost(postId).then(() => {
        setIsPostLiked(false);

        // Decrease likes count
        setLikesCount((prevLikes: number) => prevLikes - 1)
      })
      .catch((error: any) => {
        console.error("Failed to unlike the post:", error);
      });
    } else {
      // If the post is not liked, like it
      likePost(postId).then(() => {
        setIsPostLiked(true);

        // Increase likes count
        setLikesCount((prevLikes: number) => prevLikes + 1)
      })
      .catch((error: any) => {
        console.error("Failed to like the post:", error);
      });
    }
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
            className='post-image'
            aria-label={`${author?.full_name} post image`}
            aria-labelledby={`${author?.username}PostImage`}
            alt={`${author?.full_name} post image`}
          />
        )}

        {/* Post description */}
        <p className="post-description">{description}</p>

        <div className="post-actions">
          <PostActionButton
            count={likesCount}
            iconType={faHeart}
            activeStatus={isPostLiked}
            onButtonClick={() => {
              toggleLikeStatus(isPostLiked);
            }}
          />

          <PostCommentsModal
            key={postId}
            author={author}
            timePosted={timePosted}
            imageUrl={imageUrl}
            description={description}
            likes={likes}
            comments={comments}
            liked={liked}
            postId={postId}
          />
        </div>
      </div>
    </div>
  )
}
