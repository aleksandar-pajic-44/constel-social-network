"use client";

// Global styles
import './assets/styles/_global.scss';

// Font Awesome Icons
import '@fortawesome/fontawesome-svg-core/styles.css'

// React / Next Core
import { Roboto } from 'next/font/google';

// Third-party libs
import { CookiesProvider } from 'react-cookie';

// Components
import PageTitle from './components/head';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <PageTitle
        title="Social Network"
        description="We create growth hacking solutions. Our products have helped over 80.000 customers grow their Social Media accounts. We believe marketing can be so much more than just ads."
        imageUrl="https://i.imgur.com/A0j9glP.jpg"
        imageAlt="Constellation cover photo"
        locale="en_GB"
        type="website"
        twitterCard="summary_large_image"
        canonicalUrl="http://constel.co"
      />

      <body className={roboto.className}>
        <CookiesProvider defaultSetOptions={{ path: '/'}}>
          {children}
        </CookiesProvider>
      </body>
    </html>
  )
}
