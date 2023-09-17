import '../home.scss';

import Image from 'next/image';
import { useState } from 'react';

import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Account } from '@/app/login/models/login';
import CreateInput from './createComment';

export default function CreatePost({ userAccount }: { userAccount: Account }) {
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
            console.log(text);
          }}/>
        </div>

        {/* Record action section */}
        <div className='home__main__feed__post__record'>
          <Button variant='light' className='rounded-circle'>
            <FontAwesomeIcon className='record__icon' icon={faMicrophone} />
          </Button>
          <Button className='record__button' variant='secondary'>New post</Button>
        </div>
      </div>
    </div>
  )
}
