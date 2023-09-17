import React from 'react';

import { Button } from 'react-bootstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostActionButton = ({
  count,
  iconType,
  activeStatus,
  onButtonClick
}: {
  count: number,
  iconType?: IconProp,
  activeStatus?: boolean,
  onButtonClick?: () => void
}) => (
  <Button
    variant={activeStatus ? 'primary' : 'tertiary'}
    onClick={onButtonClick}
  >
    {iconType && (
      <FontAwesomeIcon icon={iconType} />
    )}
    {count}
  </Button>
);

export default PostActionButton;
