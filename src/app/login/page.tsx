"use client";

// React/Next.js core
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Styles
import './login.scss';

// Third-party libs
import { useCookies } from 'react-cookie';
import { Toast, ToastContainer } from 'react-bootstrap';

// Components
import LoginComponents from './components';

// Services
import { loginUser } from './services/login';

// Models & Enums
import { LOGIN_STATUS, LoginCredentials } from './models/login';

export default function LoginPage() {
  const [cookies, setCookie] = useCookies(['token']);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const router = useRouter();

  // Check if user is logged in (if token cookie exists)
  useEffect(() => {
    if(cookies?.token) {
      router.push('/');
    }
  });

  const loginSubmit = async (loginCredentials: LoginCredentials) => {
    try {
      // Call Login POST service
      const loginData = await loginUser(loginCredentials);
      const { token } = loginData?.data;

      // Set token as a cookie
      setTokenCookie(token);

      // Show toast and redirect
      handleSuccessfulLogin();
    } catch (error: any) {
      const { errorMessage } = error;

      if (errorMessage?.status === LOGIN_STATUS.INVALID_CREDENTIALS) {
        setErrorMessage(errorMessage.data.error.message);
        return;
      }

      setErrorMessage('An error occurred during login.');
    }
  };

  const handleSuccessfulLogin = () => {
    setShowSuccessToast(true);

    // Navigate to new page after successful login
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }

  const setTokenCookie = (token: string) => {
    const expirationDate = new Date();
    // Add 7 days to the current date
    expirationDate.setDate(expirationDate.getDate() + 7);

    // Save token as Cookie with expiration date and secure config
    setCookie('token', token, {
      expires: expirationDate,
      secure: true
    });
  }

  return (
    <div className='login container'>
      {/* Constel logo */}
      <Image
        id='constellation-logo'
        src="images/constel-logo.svg"
        width={78}
        height={94}
        aria-label='Constellation logo'
        aria-labelledby='constellationLogo1'
        alt='Constellation logo'
      />

      {/* Login form component */}
      <LoginComponents.LoginForm errorMessage={errorMessage} onFormSubmit={loginSubmit}/>

      {/* Toast message */}
      <ToastContainer position={'bottom-center'} className='mb-3'>
        <Toast bg='success' onClose={() => setShowSuccessToast(false)} show={showSuccessToast} delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Login Successful</strong>
          </Toast.Header>
          <Toast.Body className='text-light'>
            Welcome back! You&apos;ve successfully logged in to your account.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
