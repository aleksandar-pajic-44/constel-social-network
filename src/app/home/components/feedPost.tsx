import '../home.scss';

import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { parseISO, format } from 'date-fns';

import { Author } from '../models/post';

export default function FeedPost({
    author,
    timePosted,
    imageUrl,
    description
  }: {
    author: Author,
    timePosted: string,
    imageUrl?: string,
    description: string
  }) {

  // Parse the timePosted string to a Date object
  const timePostedDate = parseISO(timePosted);

  // Format the timePostedDate in "DD.MM.YYYY" format
  const formattedTimePosted = format(timePostedDate, 'dd.MM.yyyy');

  return (
    <div className="home__main__feed__post card">
      {/* Post header */}
      <div className="home__main__feed__post__header">
        <div className="user-informations-wrapper">
          {/* Author profile pic */}
          <Image
            id='author-avatar'
            src={author?.picture}
            width={40}
            height={40}
            className='rounded-circle'
            aria-label={`${author?.full_name} profile picture`}
            aria-labelledby={`${author?.username}ProfileImg1`}
            alt={`${author?.full_name} profile image`}
          />

          {/* Author details */}
          <div className="user-details">
            <span className='user-details__username'>{author?.username}</span>
            <span className='user-details__fullName'>{author?.full_name}</span>
          </div>
        </div>

        {/* Time posted  */}
        <div className="post-informations">
          <span className="post-informations__timePosted">
            <FontAwesomeIcon icon={faCalendar} />
            {formattedTimePosted}
          </span>
        </div>
      </div>

      {/* Post body */}
      <div className="home__main__feed__post__body">
        {/* Show post image if available */}
        { imageUrl && (
          <Image
            id='post-image'
            src={imageUrl}
            width={668}
            height={285}
            className='post-image'
            aria-label='Post image'
            aria-labelledby='postImage'
            alt="Author's post image"
          />
        )}

        {/* Post description */}
        <p className="post-description">{description}</p>
      </div>
    </div>
  )
}
