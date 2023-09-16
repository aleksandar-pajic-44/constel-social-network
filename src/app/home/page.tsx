"use client";

import Image from 'next/image';
import './home.scss';
import { Button, Form, InputGroup, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MutableRefObject, useRef, useState } from 'react';
import PageTitle from '../components/head';

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const mainContainerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleMouseEnter = () => {
    // Add a class to show the scrollbar when the user hovers over the container
    mainContainerRef?.current.classList.add('show-scrollbar');
  };

  const handleMouseLeave = () => {
    // Remove the class to hide the scrollbar when the user stops hovering
    mainContainerRef?.current.classList.remove('show-scrollbar');
  };

  const handleStatusInputFocus = () => {
    setIsFocused(true);
  };

  const handleStatusInputBlur = () => {
    setIsFocused(false);
  };

  const inputClass = `profile__input ${isFocused ? 'profile__input--focused' : ''}`;

  return (
    <>
      <PageTitle title='Home feed' />

      <article className='home__wrapper'>
        {/* Grid */}
        <section className='home'>
          {/* Left column */}
          <header className='home__header'>
            <div className='home__header__brandingWrapper'>
              <Image
                id='constellation-logo'
                src="images/constel-logo.svg"
                width={32}
                height={32}
                aria-label='Constellation logo'
                aria-labelledby='constellationLogo1'
                alt='Constellation logo'
              />
            </div>

            <div className='home__header__links'>
              <Nav variant="pills" activeKey="1">
                <Nav.Item>
                  <Nav.Link href="#">
                    <FontAwesomeIcon icon={faHome} />
                    Home
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </header>

          {/* Main column */}
          <main className='home__main'
            ref={mainContainerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className='home__main__headingTitle'>
              <h1>Home</h1>
            </div>

            <div className='home__main__feed'>
              {/* New post */}
              <div className="home__main__feed__post card">
                <div className="card-body">
                  {/* Status input section */}
                  <div className='home__main__feed__post__status'>
                    {/* Load user profile image */}
                    <Image
                      className='profile__image rounded-circle'
                      height={48}
                      width={48}
                      src="/images/profile.avif"
                      alt='User profile image'
                    />

                    {/* Input field */}
                    <InputGroup className={inputClass}>
                      <Form.Control
                        placeholder="Recipient's username"
                        aria-label="Recipient's username with two button addons"
                        onFocus={handleStatusInputFocus}
                        onBlur={handleStatusInputBlur}
                      />
                      <Button variant="light">
                        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                      </Button>
                    </InputGroup>
                  </div>

                  {/* Record action section */}
                  <div className='home__main__feed__post__record'>
                    <FontAwesomeIcon className='record__icon' icon={faMicrophone} />
                    <Button className='record__button' variant='secondary'>New post</Button>
                  </div>
                </div>
              </div>

              {/* Feed item */}
              <div className="home__main__feed__post card">
                <div className="card-body">
                  <h4 className="card-title">Title</h4>
                  <p className="card-text">Pizza ipsum dolor meat lovers buffalo. Pepperoni sausage banana bell ranch and white. Tossed bbq platter sauce platter. Broccoli Hawaiian pineapple style Aussie mozzarella. Pepperoni tomato thin.</p>
                </div>
              </div>
            </div>
          </main>
        </section>
      </article>
    </>
  )
}
