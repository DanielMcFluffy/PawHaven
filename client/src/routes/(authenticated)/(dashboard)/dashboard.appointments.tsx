import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/appointments')({
  component: () => <div>Hello /(authenticated)/(dashboard)/dashboard/appointments!</div>
})