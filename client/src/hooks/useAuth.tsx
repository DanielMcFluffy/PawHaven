import { AxiosPOST } from "../utils/axiosHttp";
import { TLoginForm } from "../utils/validation";
import { Api_POST } from "../models/Api";
import { AuthInfo } from "../models/Response";

export const useAuth = async(loginForm: TLoginForm) => {
  const {username, password} = loginForm
  const response = await AxiosPOST<TLoginForm, AuthInfo, Api_POST>('/login', {
    username, password
  })

  return response;
}