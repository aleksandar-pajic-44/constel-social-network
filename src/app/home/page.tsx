"use client";

// React Core
import React, { useEffect, useState } from 'react';

// Third-party libraries
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { MutableRefObject, useRef } from 'react';
import Image from 'next/image';
import ContentLoader from 'react-content-loader';

// Components
import PageTitle from '../components/head';
import HomeComponents from './components';

// Services
import { getUserDetails } from './services/user.service';

// Models
import { Account } from '../login/models/login';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export default function Home() {
  const mainContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [userDetails, setUserDetails] = useState<Account>();
  const [cookies] = useCookies(['token']);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = () => {
      getUserDetails()
        .then((userAccountDetails) => {
          setUserDetails(userAccountDetails);
        })
        .catch((error) => {
          console.error('Error fetching user account details:', error);
        });
    };

    fetchUserData();
  }, []);

  // Check if user is logged in (if token cookie exists)
  useEffect(() => {
    if(!cookies?.token) {
      router.push('/login');
    }
  });

  const handleMouseEnter = () => {
    // Add a class to show the scrollbar when the user hovers over the container
    mainContainerRef?.current.classList.add('show-scrollbar');
  };

  const handleMouseLeave = () => {
    // Remove the class to hide the scrollbar when the user stops hovering
    mainContainerRef?.current.classList.remove('show-scrollbar');
  };

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
              { userDetails ? (
                <HomeComponents.CreatePost userAccount={userDetails}/>
              ) : (
                <ContentLoader
                  uniqueKey='createPosts'
                  viewBox="0 0 320 54"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="27" cy="27" r="18" />
                  <rect x="53" y="14" rx="3" ry="3" width="180" height="13" />
                  <rect x="53" y="30" rx="3" ry="3" width="10" height="10" />
                  <rect x="67" y="30" rx="3" ry="3" width="74" height="10" />
                  <circle cx="305" cy="27" r="8" />
                </ContentLoader>
              )}

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
