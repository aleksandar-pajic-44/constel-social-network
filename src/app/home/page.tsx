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
import HomeComponents from './components';

// Services
import { getFeedPosts, getUserDetails } from './services/user.service';

// Models
import { Account } from '../login/models/login';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { Post } from './models/post';
import PageTitle from '../components/head';

export default function Home() {
  const mainContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [userDetails, setUserDetails] = useState<Account>();
  const [feedPosts, setFeedPosts] = useState<Post[]>();
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

  useEffect(() => {
    const fetchFeedPosts = () => {
      getFeedPosts()
        .then((feedPosts: Post[]) => {
          setFeedPosts(feedPosts);
        })
        .catch((error) => {
          console.error('Error fetching user account details:', error);
        });
    };

    fetchFeedPosts();
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
              {/* Create new post section */}
              { userDetails ? (
                <HomeComponents.CreatePost userAccount={userDetails}/>
              ) : (
                // Show content loader if data is not yet loaded
                <HomeComponents.CreatePostLoader />
              )}

              {/* Feed with posts */}
                {feedPosts ? (
                  <>
                    {feedPosts.map((post: Post) => (
                      <HomeComponents.FeedPost
                        key={post.post_id}
                        author={post.user}
                        timePosted={post.created_at}
                        imageUrl={post.image}
                        description={post.text}
                      />
                    ))}
                  </>
                ) : (
                  <HomeComponents.FeedPostLoader count={5} />
                )}

            </div>
          </main>
        </section>
      </article>
    </>
  )
}
