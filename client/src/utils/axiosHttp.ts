import axios from "axios";
import { Api_GET, Api_POST } from "../models/Api";
import { BaseResponse } from "../models/Response";

export const AxiosGET = async<
TResponse,
TApi extends Api_GET
>(url: TApi): Promise<BaseResponse<TResponse>> => {
  
  const response = await axios.get(url, {baseURL: 'http://localhost:5050'})
  return response.data as BaseResponse<TResponse>
};

export const AxiosPOST = async<
TRequest extends object,
TResponse,
TApi extends Api_POST
>(url: TApi, request: TRequest): Promise<BaseResponse<TResponse>> => {
  
  const response = await axios.post(url, request, {baseURL: 'http://localhost:5050'})
  return response.data as BaseResponse<TResponse>
}