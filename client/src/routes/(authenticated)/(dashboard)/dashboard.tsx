import { createFileRoute, redirect } from '@tanstack/react-router'
import { auth } from '../../../utils/auth';

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard')({
  beforeLoad: async() => {
    const response = await auth();
    if (response) {
      return;
    } else {
      throw redirect({to: '/home'})
    }
  }, 
})