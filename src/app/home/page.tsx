"use client";

import Image from 'next/image';
import './home.scss';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { MutableRefObject, useRef } from 'react';
import PageTitle from '../components/head';

export default function Home() {
  const mainContainerRef = useRef() as MutableRefObject<HTMLDivElement>;

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
              {/* New post */}
              <div className="home__main__feed__post card">
                <div className="card-body">

                  <p className="card-text">Pizza ipsum dolor meat lovers buffalo. Pepperoni sausage banana bell ranch and white. Tossed bbq platter sauce platter. Broccoli Hawaiian pineapple style Aussie mozzarella. Pepperoni tomato thin.</p>
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
