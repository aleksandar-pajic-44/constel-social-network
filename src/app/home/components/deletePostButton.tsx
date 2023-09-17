import React from 'react';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PostDeleteButton = (): React.ReactNode => {
  return (
    <Button variant='link' size={'sm'} className="post__deleteBtn">
      <FontAwesomeIcon icon={faTrash} />
      Delete
    </Button>
  )
};

export default PostDeleteButton;
