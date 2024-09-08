import { AxiosGET } from "../utils/axiosHttp";

export const auth = async() => {
  const response = await AxiosGET('/check-session');
  return response.status === 200;
}