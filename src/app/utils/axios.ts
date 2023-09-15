import axios from 'axios';

// Create a new Axios instance with custom defaults
const axiosInstance = axios.create({
  baseURL: 'https://api.hr.constel.co/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

if (typeof window !== 'undefined') {
  // Check if a bearer token is present in localStorage
  const token = localStorage.getItem('token');

  // If a token is found in localStorage, set it as the default 'Authorization' header
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;
