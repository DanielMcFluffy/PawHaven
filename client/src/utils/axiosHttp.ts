/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Api_DELETE, Api_GET, Api_POST } from "../models/Api";
import { BaseResponse, ErrorResponse } from "../models/Response";

const baseURL = import.meta.env.VITE_BASE_URL;

export const AxiosGET = async<
TResponse,
TApi extends Api_GET
>(url: TApi): Promise<BaseResponse<TResponse> | ErrorResponse > => {
  try {
    const response = await axios.get(url, {baseURL, withCredentials: true})
    return response.data as BaseResponse<TResponse>;
  } catch (error) {
    console.error('Error:', (error as any).response.data);
    return (error as any).response.data as ErrorResponse;
  }
};

export const AxiosPOST = async<
TRequest,
TResponse,
TApi extends Api_POST
>(url: TApi, request: TRequest): Promise<BaseResponse<TResponse> | ErrorResponse> => {
  try {
    const response = await axios.post(url, request, {baseURL, withCredentials: true})
    return response.data as BaseResponse<TResponse>
  } catch (error) {
    console.error('Error:', (error as any).response.data);
    return (error as any).response.data as ErrorResponse;
  }
}

export const AxiosDELETE = async<
TResponse,
TApi extends Api_DELETE
>(url: TApi): Promise<BaseResponse<TResponse> | ErrorResponse> => {
  try {
    const response = await axios.delete(url, {baseURL, withCredentials: true})
    return response.data as BaseResponse<TResponse>
  } catch (error) {
    console.error('Error:', (error as any).response.data);
    return (error as any).response.data as ErrorResponse;
  }
}
  