import React from 'react';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PostDeleteButton = ({
  onButtonSubmit
} : {
  onButtonSubmit: () => void
}): React.ReactNode => {
  const handleClick = () => {
    onButtonSubmit(); // Emit an empty value by calling the callback without arguments
  };

  return (
    <Button variant='link' size={'sm'} className="post__deleteBtn" onClick={handleClick}>
      <FontAwesomeIcon icon={faTrash} />
      Delete
    </Button>
  )
};

export default PostDeleteButton;
