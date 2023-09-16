"use client";

// Global styles
import './assets/styles/_global.scss';

// Font Awesome Icons
import '@fortawesome/fontawesome-svg-core/styles.css'

// React / Next Core
import Head from 'next/head';
import { Roboto } from 'next/font/google';

// Third-party libs
import { CookiesProvider } from 'react-cookie';

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <body className={roboto.className}>
        <CookiesProvider defaultSetOptions={{ path: '/'}}>
          {children}
        </CookiesProvider>
      </body>
    </html>
  )
}
