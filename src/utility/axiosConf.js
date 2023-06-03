import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://randomuser.me/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default axiosInstance;
