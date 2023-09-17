import Image from 'next/image';
import React from 'react';

const PostAuthorDetails = ({
  username,
  fullName,
  picture
}: {
  username: string,
  fullName: string,
  picture: string
}) => (
  <div className="user-informations-wrapper">
    {/* Author profile pic */}
    <Image
      id='author-avatar'
      src={picture}
      width={40}
      height={40}
      className='rounded-circle'
      aria-label={`${fullName} profile picture`}
      aria-labelledby={`${username}ProfileImg1`}
      alt={`${fullName} profile image`}
    />

    {/* Author details */}
    <div className="user-details">
      <span className='user-details__username'>@{username}</span>
      <span className='user-details__fullName'>{fullName}</span>
    </div>
  </div>
);

export default PostAuthorDetails;
