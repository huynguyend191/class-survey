import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development'
? 'http://localhost:5000'
: 'http://example.com' ;

const axiosRequest = axios.create({
  baseURL,
  withCredentials: true
});

axiosRequest.interceptors.response.use(
  response => (response), 
  error => {
    if (error.response){
      //when server is running
      return (Promise.reject(error.response.data));
    } 
    else {
      //when server is not running
      return (Promise.reject());
    }
  }
);

export default axiosRequest;