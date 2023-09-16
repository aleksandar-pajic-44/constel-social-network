"use client";

// Global styles
import './assets/styles/_global.scss';

// Font Awesome Icons
import '@fortawesome/fontawesome-svg-core/styles.css'

// React / Next Core
import { Roboto } from 'next/font/google';

// Third-party libs
import { CookiesProvider } from 'react-cookie';
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
      <PageTitle title='/' />

      <body className={roboto.className}>
        <CookiesProvider defaultSetOptions={{ path: '/'}}>
          {children}
        </CookiesProvider>
      </body>
    </html>
  )
}
