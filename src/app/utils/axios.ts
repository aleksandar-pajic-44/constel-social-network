import axios from 'axios';
import Cookies from 'universal-cookie';

// Create a new Axios instance with custom defaults
const axiosInstance = axios.create({
  baseURL: process.env.DB_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the 'Authorization' header with the token from cookies
const setAuthHeaderFromCookies = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Call the function to set the 'Authorization' header
setAuthHeaderFromCookies();

export default axiosInstance;
