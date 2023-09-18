import Image from 'next/image';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

import CreateInput from './createInput';

import { Account } from '@/app/login/models/login';

export default function CreatePost({
  userAccount,
  onPostCreateSubmit
}: {
  userAccount: Account,
  onPostCreateSubmit: (text: string) => void
}): React.ReactNode {
  return (
    <div className="home__main__feed__post card">
      <div className="card-body">
        {/* Status input section */}
        <div className='home__main__feed__post__status'>
          {/* Load user profile image */}
          <Image
            className='profile__image rounded-circle'
            height={48}
            width={48}
            src={userAccount?.picture}
            aria-label='User Profile Image'
            aria-labelledby='userProfileImg1'
            alt='User profile image'
          />

          {/* Input field */}
          <CreateInput placeholder="What's happening" onSubmit={(text: string) => {
            onPostCreateSubmit(text);
          }}/>
        </div>

        {/* Record action section */}
        <div className='home__main__feed__post__record'>
          <Button
            id='voiceRecordBtn'
            variant='light'
            className='rounded-circle'
            aria-label='Voice record button'
            aria-labelledby='voiceRecordBtn1'
          >
            <FontAwesomeIcon className='record__icon' icon={faMicrophone} />
          </Button>
          <Button
            id='submitPostBtn'
            className='record__button'
            variant='secondary'
            aria-label='Submit post button'
            aria-labelledby='submitPostBtn1'
          >
            New post
          </Button>
        </div>
      </div>
    </div>
  )
}
