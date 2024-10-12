import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard')({
  beforeLoad: async({context}) => {
    const cookieName = import.meta.env.VITE_COOKIE_NAME;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, _, removeCookie] = context.cookie;
    if (!(cookie as Record<string, string>)[cookieName]) {
      throw redirect({
        to: '/home/main'
      })
    } 
    const {AxiosGET} = context.axios
    const response = await AxiosGET('/check-session')
    if (response.status !==200) {
      removeCookie(cookieName)
      throw redirect({
        to: '/home/main'
      })
    }
  },
})