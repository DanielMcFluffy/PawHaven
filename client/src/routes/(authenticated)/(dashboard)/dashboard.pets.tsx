import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/pets')({
  component: () => <div>Hello /(authenticated)/(dashboard)/dashboard/pets!</div>
})