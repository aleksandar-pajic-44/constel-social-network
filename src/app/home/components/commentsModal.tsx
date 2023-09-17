import { useEffect, useState } from 'react';
import Image from 'next/image';

import Modal from 'react-bootstrap/Modal';
import { faComment } from '@fortawesome/free-solid-svg-icons';

import PostAuthorDetails from './authorDetails';
import PostTimePosted from './timePosted';
import PostActionButton from './actionButton';
import PostCommentsList from './commentsList';
import PostCommentsListLoader from './commentsListLoader';
import CreateInput from './createInput';

import { PostComment } from '../models/post';
import { Author } from '../models/post';

function PostCommentsModal({
  author,
  timePosted,
  imageUrl,
  description,
  comments,
  postId,
  children,
  postComments,
  commentsLoaded,
  fetchPostComments,
  onCreateCommentSubmit
}: {
  author: Author,
  timePosted: string,
  imageUrl?: string,
  description: string,
  comments: number,
  postId: string,
  postComments: PostComment[],
  commentsLoaded: boolean,
  children?: React.ReactNode,
  fetchPostComments: (postId: string) => void,
  onCreateCommentSubmit: (postId: string, text: string) => void
}) {
  const [showCommentsModal, setShowCommentsModal] = useState<boolean>(false); // State to show or hide modal

  const handleCloseModal = (): void => setShowCommentsModal(false);
  const handleShowModal = (): void => setShowCommentsModal(true);

  useEffect(() => {
    if(showCommentsModal) {
      fetchPostComments(postId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCommentsModal, postId]);

  const handleCommentSubmit = (postId: string, text: string): void => {
    onCreateCommentSubmit(postId, text);
  };

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

          {/* Comment created at time */}
          <PostTimePosted timePosted={timePosted}/>

          {/* Comment text */}
          <p className="post__description post__description--modal">
            {description}
          </p>

          {/* Input for creating new comment on post */}
          <div className='mt-1 w-100'>
            <CreateInput placeholder='Write a comment' onSubmit={(text: string) => {
              handleCommentSubmit(postId, text);
            }}/>
          </div>

          {/* Pass like and comment button components */}
          <div className='post__actions post__actions--comment'>
            {children}
          </div>

          {commentsLoaded ? (
            postComments?.length > 0 && (
              <PostCommentsList authorUsername={author?.username} comments={postComments} />
            )
          ) : (
            <PostCommentsListLoader count={3} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostCommentsModal;