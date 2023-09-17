import { useState } from 'react';
import Image from 'next/image';

import Modal from 'react-bootstrap/Modal';
import { faComment } from '@fortawesome/free-solid-svg-icons';

import PostAuthorDetails from './authorDetails';
import PostTimePosted from './timePosted';
import PostActionButton from './actionButton';

import { Author } from '../models/post';

function PostCommentsModal({
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
  postId: string,
}) {
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const handleCloseModal = () => setShowCommentsModal(false);
  const handleShowModal = () => setShowCommentsModal(true);

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
              className='post-image'
              aria-label={`${author?.full_name} post image`}
              aria-labelledby={`${author?.username}PostImage`}
              alt={`${author?.full_name} post image`}
            />
          )}

          <PostTimePosted timePosted={timePosted}/>

          <p className="post-description post-description--modal">{description}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostCommentsModal;