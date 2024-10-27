/* eslint-disable @typescript-eslint/no-explicit-any */
const environment = import.meta.env.VITE_NODE_ENV;

export const log = (...args: any[]) => {
  environment === 'development' && console.log(...args)
}

export const pageArray = (maxPage: number) => {
  return Array(maxPage)
    .fill(0)
    .map((element, index) => element = index + 1) 
}