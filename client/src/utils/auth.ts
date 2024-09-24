import { AxiosGET } from "./axiosHttp";

export const auth = async() => {
  const response = await AxiosGET('/check-session');
  if (response.status === 200) {
    localStorage.setItem('has-session', '1')
    return true;
  } else {
    localStorage.setItem('has-session', '0')
    return false;
  }
}

export const hasSession = () => {
  const session = localStorage.getItem('has-session');
  return session === '1'
}