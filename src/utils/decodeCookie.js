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

  // const userInfo = {
  //   username: decoded.UserEntity.Username.toLowerCase(),
  //   role: decoded.UserEntity.Roles[1].toLowerCase()
  // }
  const userInfo = {
    username: decoded.UserEntity.Username.toLowerCase(),
    role: 'admin'
  }
  // const userInfo = {
  //   username: 'admin',
  //   role: 'admin'
  // }
  return userInfo;
}

export default decodeCookie;