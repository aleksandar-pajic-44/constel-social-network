import React from 'react';

import { Button } from 'react-bootstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostActionButton = ({
  count,
  iconType,
  likedStatus
}: {
  count: number,
  iconType?: IconProp,
  likedStatus?: boolean
}) => (
  <Button
    variant={likedStatus ? 'primary' : 'tertiary'}
    disabled={count === 0}
  >
    {iconType && (
      <FontAwesomeIcon icon={iconType} />
    )}
    {count}
  </Button>
);

export default PostActionButton;
