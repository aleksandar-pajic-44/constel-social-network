import { useEffect, useState } from 'react';
import Image from 'next/image';

import Modal from 'react-bootstrap/Modal';
import { faComment } from '@fortawesome/free-solid-svg-icons';

import PostAuthorDetails from './authorDetails';
import PostTimePosted from './timePosted';
import PostActionButton from './actionButton';

import { Author } from '../models/post';
import { getCommentsForPost } from '../services/user.service';
import PostCommentsList from './commentsList';
import { PostComment } from '../models/post';
import PostCommentsListLoader from './commentsListLoader';

function PostCommentsModal({
  author,
  timePosted,
  imageUrl,
  description,
  comments,
  postId,
  children
}: {
  author: Author,
  timePosted: string,
  imageUrl?: string,
  description: string,
  comments: number,
  postId: string,
  children?: React.ReactNode
}) {
  const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false);
  const [postComments, setPostComments] = useState<PostComment[]>([]); // State to store comments
  const [commentsLoaded, setCommentsLoaded] = useState<boolean>(false); // State to store comments

  const handleCloseModal = () => setShowCommentsModal(false);
  const handleShowModal = () => setShowCommentsModal(true);

  useEffect(() => {
    if(showCommentsModal) {
      // Set is loaded state to false
      setCommentsLoaded(false);

      // Call getCommentsForPost and update postComments state
      getCommentsForPost(postId)
      .then((comments: PostComment[]) => {
        setPostComments(comments);
        // Set loaded state to true once comments are fetched
        setCommentsLoaded(true);
      })
      .catch((error: any) => {
        console.error("Error retrieving comments:", error);
      });
    }
  }, [showCommentsModal, postId]);

  return (
    <>
      <PostActionButton
        count={comments}
        iconType={faComment}
        onButtonClick={() => handleShowModal()}
      />

      <Modal className='commentsModal' show={showCommentsModal} size={'lg'} centered onHide={handleCloseModal} backdrop="static">
        {/* Modal header */}
        <Modal.Header className='commentsModal__header' closeButton>
          <PostAuthorDetails
            username={author?.username}
            fullName={author?.full_name}
            picture={author?.picture}
          />
        </Modal.Header>

        {/* Modal body */}
        <Modal.Body className='commentsModal__body'>
          {imageUrl && (
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

          <PostTimePosted timePosted={timePosted}/>

          <p className="post__description post__description--modal">
            {description}
          </p>

          <div className='post__actions'>
            {children}
          </div>


          {commentsLoaded ? (
            postComments?.length > 0 && (
              <PostCommentsList authorUsername={author?.username} comments={postComments} />
            )
          ) : (
            <PostCommentsListLoader count={2} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostCommentsModal;