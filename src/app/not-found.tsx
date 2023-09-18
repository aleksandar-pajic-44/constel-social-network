"use client";

// Global styles
import './assets/styles/_global.scss';

import Image from "next/image";
import Link from 'next/link';

import { Button } from "react-bootstrap";

function NotFoundPage(): React.ReactNode {
	return (
      <div className="notFound">
        <div className="notFound__container">
          <Image
            id='constellation-logo'
            src="images/constel-logo.svg"
            width={75}
            height={75}
            aria-label='Constellation logo'
            aria-labelledby='constellationLogoNotFound1'
            alt='Constellation logo'
          />

          <h1 className='notFound__container__title'>Page not found</h1>
          <p className='notFound__container__message'>Oops! It seems like you&apos;ve taken a wrong turn. The page you&apos;re looking for isn&apos;t here. Don&apos;t worry; it happens to the best of us.</p>

          <Link href='/home'>
            <Button className='notFound__container__redirect' variant="outline-primary">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
  );
}

export default NotFoundPage
