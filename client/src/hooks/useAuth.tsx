/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import React from "react";
import { BaseContext } from "../contexts/baseContext";
import { log } from "../utils";
import { toast } from "react-toastify";
import { ErrorResponse } from "../models/Response";

const baseURL = import.meta.env.VITE_BASE_URL;

export const useAuth = () => {

  const setShowLoading = React.useContext(BaseContext)!.setShowLoading;
  const navigate = useNavigate();

  const login = async(username: string, password: string) => {
    if (!username || !password) {
      return toast.error('Please fill in all fields!');
    }
    try {
      log('[REQUEST][POST]', '/login');
      setShowLoading(true);
      const response = await axios.post('/login', {username, password}, {baseURL, withCredentials: true});
      response.data ? log('[RESPONSE][POST]', '/login', response.data) : undefined;
      if (response.status === 200) {
        navigate({to: '/dashboard'});
      }
    } catch (error) {
      console.error('Error:', (error as any).response.data);
      toast.error((error as any).response.data.message);
      navigate({to: '/home'});
      return (error as any).response.data as ErrorResponse;
    } finally {
      setShowLoading(false);
    }
  }

  const logout = async() => {
    try {
      log('[REQUEST][GET]', '/logout');
      setShowLoading(true);
      const response = await axios.get('/logout', {baseURL, withCredentials: true})
      response.data ? log('[RESPONSE][GET]', '/logout', response.data) : undefined;
      if (response.status === 200) {
        toast.success('Logged out successfully');
        navigate({to: '/home'});
        sessionStorage.clear();
      }
    } catch (error) {
      console.error('Error:', (error as any).response.data);
      toast.error((error as any).response.data.message);
      navigate({to: '/home'});
      sessionStorage.clear();
      return (error as any).response.data as ErrorResponse;
    } finally {
      setShowLoading(false);
    }
  }

  const register = async(username: string, password: string, email: string) => {
    if (!username || !password || !email) {
      return toast.error('Please fill in all fields');
    }
    try {
      log('[REQUEST][POST]', '/register');
      setShowLoading(true);
      const response = await axios.post('/register', {username, password, email}, {baseURL, withCredentials: true});
      response.data ? log('[RESPONSE][POST]', '/register', response.data) : undefined;
    } catch (error) {
      console.error('Error:', (error as any).response.data);
      toast.error((error as any).response.data.message);
      return (error as any).response.data as ErrorResponse;
    } finally {
      setShowLoading(false);
    }
  }
  //add session storage methods

  return {
    login,
    logout,
    register
  }

}