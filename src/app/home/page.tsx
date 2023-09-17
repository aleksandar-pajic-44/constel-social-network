"use client";

// React Core
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

// Third-party libraries
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { MutableRefObject, useRef } from 'react';
import Image from 'next/image';

// Components
import HomeComponents from './components';
import PageTitle from '../components/head';

// Services
import { createPostComment, getCommentsForPost, getFeedPosts, getUserDetails, likeOrUnlikePost } from './services/user.service';

// Models
import { Account } from '../login/models/login';
import { Post, PostComment } from './models/post';

export default function Home() {
  const mainContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [userDetails, setUserDetails] = useState<Account>();
  const [feedPosts, setFeedPosts] = useState<Post[]>();
  const [cookies] = useCookies(['token']);

  const [postComments, setPostComments] = useState<PostComment[]>([]); // State to store comments
  const [commentsLoaded, setCommentsLoaded] = useState<boolean>(false); // State to store comments

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = (): void => {
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
    const fetchFeedPosts = (): void => {
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

  const handleFetchPostComments = (postId: string): void => {
    setCommentsLoaded(false);

    // Call getCommentsForPost and update postComments state
    getCommentsForPost(postId).then((comments: PostComment[]): void => {
      setPostComments(comments);
      // Set loaded state to true once comments are fetched
      setCommentsLoaded(true);
    })
    .catch((error: any) => {
      console.error("Error retrieving comments:", error);
    });
  }

  const handleLikeStatus = (postId: string, isLiked: boolean): void => {
    const action = isLiked ? 'unlike' : 'like';

    likeOrUnlikePost(postId, isLiked).catch((error: any) => {
      console.error(`Failed to ${action} the post:`, error);
    });
  }

  const handleCreateComment = (postId: string, text: string): void => {
    createPostComment(postId, text).then(() => {
      getCommentsForPost(postId)
        .then((comments: PostComment[]) => {
          setPostComments(comments);
        })
        .catch((error: any) => {
          console.error("Error retrieving comments:", error);
        });
    })
    .catch((error: any) => {
      console.error("Error creating comment:", error);
    });
  };

  const handleMouseEnter = (): void => {
    // Add a class to show the scrollbar when the user hovers over the container
    mainContainerRef?.current.classList.add('show-scrollbar');
  };

  const handleMouseLeave = (): void => {
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

              <Image
                id='constellation-logo'
                src="images/constel-logo.svg"
                width={32}
                height={32}
                aria-label='Constellation logo'
                aria-labelledby='constellationLogo1'
                className='home__main__headingTitle__branding'
                alt='Constellation logo'
              />
            </div>

            {/* Main feed section */}
            <div className='home__main__feed'>
              { userDetails ? (
                <HomeComponents.CreatePost userAccount={userDetails}/>
              ) : (
                // Show content loader if data is not yet loaded
                <HomeComponents.CreatePostLoader />
              )}

              {/* Feed with posts */}
                {feedPosts ? (
                  <>
                    {feedPosts.map(({ post_id, user, created_at, image, text, likes, comments, liked }: Post) => (
                      <HomeComponents.FeedPost
                        key={post_id}
                        author={user}
                        timePosted={created_at}
                        imageUrl={image}
                        description={text}
                        likes={likes}
                        comments={comments}
                        liked={liked}
                        postId={post_id}
                        commentsLoaded={commentsLoaded}
                        postComments={postComments}
                        fetchPostComments={(postId: string) => {
                          handleFetchPostComments(postId);
                        }}
                        toggleLikeStatus={(postId: string, isLiked: boolean) => {
                          handleLikeStatus(postId, isLiked);
                        }}
                        onCreateCommentSubmit={(postId: string, text: string) => {
                          handleCreateComment(postId, text);
                        }}
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
