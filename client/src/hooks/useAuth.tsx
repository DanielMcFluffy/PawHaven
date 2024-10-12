/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { BaseContext } from "../contexts/baseContext";
import { toast } from "react-toastify";
import { useAxios } from "./useAxios";
import { User } from "../models/User";
import { AuthResponse } from "../models/Response";

export const useAuth = () => {

  const navigate = useNavigate();
  const {AxiosPOST, AxiosGET} = useAxios();
  const removeCookie = React.useContext(BaseContext)!.removeCookie;

  const storeUser = (user: User) => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  const getUser = () => {
    return JSON.parse(sessionStorage.getItem('user')!) as User
  }

  const clearUser = () => {
    const cookieName = import.meta.env.VITE_COOKIE_NAME;
    sessionStorage.removeItem('user');
    removeCookie(cookieName)
  }

  const login = async(username: string, password: string) => {
    if (!username || !password) {
      return toast.error('Please fill in all fields!');
    }

      const data = await AxiosPOST('/login', {username, password}) as AuthResponse;
      if (data.status === 200) {
        storeUser(data.result.user);
        return navigate({
        to: '/dashboard'
      })
    }
  }

  const logout = async() => {
    const data = await AxiosGET('/logout');
    if (data.status === 200) {
      clearUser();
      return navigate({
        to: '/home/main'
      })
    } else {
      clearUser();
      return navigate({
        to: '/home/main'
      })
    }
  }

  const register = async(username: string, password: string, email: string) => {
    if (!username || !password || !email) {
      return toast.error('Please fill in all fields');
    }
    await AxiosPOST('/register', {username, password, email});
  }

  return {
    login,
    logout,
    register,
    storeUser,
    getUser,
    clearUser,
  }

}