import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pparklink.fly.dev',
});

export default axiosInstance;
