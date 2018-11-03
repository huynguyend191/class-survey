import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
const cookies = new Cookies();

const decodeCookie = () => {
  const allCookies = cookies.getAll();
  let token;
  for (let cookieName in allCookies) {
    token = cookies.get(cookieName);
  }
  const decoded = jwtDecode(token);
  const userInfo = {
    username: decoded.username,
    role: decoded.role
  }
  return userInfo;
}

export default decodeCookie;