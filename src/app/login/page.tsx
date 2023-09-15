"use client";

import './login.scss';

import { useState } from 'react';
import Image from 'next/image';
import axiosInstance from '../utils/axios';
import { Alert, Button } from 'react-bootstrap';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!email.includes('@') || password.length < 6) {
      setErrorMessage('Invalid email or password.');
      return;
    }

    try {
      // Server-side validation (simulated) using Axios
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);

      // Handle different response statuses
      if (response.status === 404) {
        setErrorMessage('Email not found.');
      } else if (response.status === 401) {
        setErrorMessage('Wrong password.');
      } else if (!response.data.success) {
        setErrorMessage('An error occurred during login.');
      } else {
        // Successful login
        setErrorMessage('');
        // Redirect or perform other actions on successful login
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setErrorMessage('An error occurred during login.');
    }
  };

  // Function to handle the GET request and log the response
  const handleGetMe = async () => {
    console.log('it works');
    try {
      const response = await axiosInstance.get('/accounts/me');
      console.log(response.data); // Log the response data
    } catch (error) {
      console.error('Error fetching /accounts/me:', error);
    }
  };

  return (
    <div className='login container'>
      <Image
        id='constellation-logo'
        src="images/constel-logo.svg"
        width={78}
        height={94}
        alt='Constellation logo'
      />
      {/* Form wrapper */}
      <form className='login__form' id='login-form' onSubmit={handleSubmit}>
        {/* Email input */}
        <div className="form-group">
          <label className='fw-bold' htmlFor="login-email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="login-email"
            aria-describedby="emailHelp"
            placeholder="Enter email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password input */}
        <div className="form-group">
          <label className='fw-bold' htmlFor="login-password">Password</label>
          <input
            type="password"
            className="form-control"
            id="login-password"
            placeholder="Enter password here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && <Alert className='login__errorMessage' variant='danger'>{errorMessage}</Alert>}

        {/* Submit button */}
        <div className='d-flex justify-content-center'>
          <Button className='login__submitButton' id='login-submit' type='submit' variant='secondary'>Confirm</Button>
        </div>
      </form>

      <Button variant='secondary' onClick={() => {handleGetMe()}}>Get user data</Button>
    </div>
  );
}
