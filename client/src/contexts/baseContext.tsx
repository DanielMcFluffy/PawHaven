/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Cookie, CookieSetOptions } from 'universal-cookie';

export type TBaseContext = {
  // loading state
  showLoading: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // cookie 
  cookie: {
    [cookieName: string]: Cookie 
  };
  setCookie: (name: any, value: Cookie, options?: CookieSetOptions) => void;
  removeCookie: (name: any, options?: CookieSetOptions) => void
}

export const BaseContext = React.createContext<TBaseContext | null>(null)
