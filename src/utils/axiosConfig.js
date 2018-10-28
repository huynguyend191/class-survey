import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development'
? 'http://localhost:3001'
: 'http://example.com' ;

const axiosRequest = axios.create({
  baseURL,
  withCredentials: true
});

axiosRequest.interceptors.response.use(
  response => (response), 
  error => (Promise.reject(error.response.data))
);

export default axiosRequest;