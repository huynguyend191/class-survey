import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development'
? 'http://localhost:5000'
: 'http://example.com' ;

const axiosRequest = axios.create({
  baseURL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
});

axiosRequest.interceptors.response.use(
  response => (response), 
  error => {
    if (error.response){
      //when server is running
      return (Promise.reject(error.response.data));
    } else {
      //when server is not running
      const err = {message: 'Server error'};
      return (Promise.reject(err));
    }
  }
);

export default axiosRequest;