"use client";

// React/Next.js core
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Styles
import './login.scss';

// Services
import {  loginUser } from './services/login';

// Models & Enums
import { LOGIN_STATUS, LoginCredentials } from './models/login';
import LoginForm from './components/loginForm';

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const loginSubmit = async (loginCredentials: LoginCredentials) => {
    try {
      // Call Login POST service
      const loginData = await loginUser(loginCredentials);

      // Save token in local storage
      localStorage.setItem('token', loginData.data.token);

      // Navigate to new page after successful login
      router.push('/posts');
    } catch (error: any) {
      const { errorMessage } = error;

      if (errorMessage.status === LOGIN_STATUS.INVALID_CREDENTIALS) {
        setErrorMessage(errorMessage.data.error.message);
        return;
      }

      setErrorMessage('An error occurred during login.');
    }
  };

  return (
    <div className='login container'>
      {/* Constel logo */}
      <Image
        id='constellation-logo'
        src="images/constel-logo.svg"
        width={78}
        height={94}
        alt='Constellation logo'
      />

      {/* Login form component */}
      <LoginForm errorMessage={errorMessage} onFormSubmit={loginSubmit}/>
    </div>
  );
}
