import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard')({
  beforeLoad: async({context}) => {
    const [cookie] = context.cookie;
    if (!(cookie as Record<string, string>)['connect.sid']) {
      throw redirect({
        to: '/home/main'
      })
    } 
    const {AxiosGET} = context.axios
    const response = await AxiosGET('/check-session')
    if (response.status !==200) {
      throw redirect({
        to: '/home/main'
      })
    }

  },
})