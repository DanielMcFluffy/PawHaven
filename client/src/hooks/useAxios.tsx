/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Api_DELETE, Api_GET, Api_POST } from "../models/Api";
import { BaseResponse, ErrorResponse } from "../models/Response";
import { log } from "../utils";
import React from "react";
import { BaseContext } from "../contexts/baseContext";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL;

export const useAxios = () => {
  
  const setShowLoading = React.useContext(BaseContext)!.setShowLoading;

  const AxiosGET = async<
  TResponse,
  TApi extends Api_GET
  >(
    url: TApi,
    id?: string,
  ): Promise<BaseResponse<TResponse> | ErrorResponse > => {
    try {
      log('[REQUEST][GET]', url + (id || ''));
      setShowLoading(true);
      const response = await axios.get(url + (id || ''), {baseURL, withCredentials: true})
      response.data ? log('[RESPONSE][GET]', url + (id || ''), response.data) : undefined;
      return response.data as BaseResponse<TResponse>;
    } catch (error) {
      console.error('Error:', (error as any).response?.data || 'Connection Error');
      toast.error((error as any).response?.data.message || 'Connection Error');
      return (error as any).response.data as ErrorResponse;
    } finally {
      setShowLoading(false);
    }
  };
  
  const AxiosPOST = async<
  TRequest,
  TResponse,
  TApi extends Api_POST
  >(
    url: TApi, 
    request: TRequest,
    id?: string,
  ): Promise<BaseResponse<TResponse> | ErrorResponse> => {
    try {
      log('[REQUEST][POST]', url + (id || ''));
      setShowLoading(true);
      const response = await axios.post(url + (id || ''), request, {baseURL, withCredentials: true})
      response.data ? log('[RESPONSE][POST]', url + (id || ''), response.data) : undefined;
      return response.data as BaseResponse<TResponse>
    } catch (error) {
      console.error('Error:', (error as any).response?.data || 'Connection Error');
      toast.error((error as any).response?.data.message || 'Connection Error');
      return (error as any).response.data as ErrorResponse;
    } finally {
      setShowLoading(false);
    }
  }
  
  const AxiosDELETE = async<
  TResponse,
  TApi extends Api_DELETE
  >(
    url: TApi,
    id?: string,
  ): Promise<BaseResponse<TResponse> | ErrorResponse> => {
    try {
      log('[REQUEST][DELETE]', url + (id || ''));
      setShowLoading(true);
      const response = await axios.delete(url + (id || ''), {baseURL, withCredentials: true})
      response.data ? log('[RESPONSE][DELETE]', url + (id || ''), response.data) : undefined;
      return response.data as BaseResponse<TResponse>
    } catch (error) {
      console.error('Error:', (error as any).response?.data || 'Connection Error');
      toast.error((error as any).response?.data.message || 'Connection Error');
      return (error as any).response.data as ErrorResponse;
    } finally {
      setShowLoading(false);
    }
  }
    
  return {AxiosGET, AxiosPOST, AxiosDELETE}

}

