import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/medicines')({
  component: () => <div>Hello /(authenticated)/(dashboard)/dashboard/medicines!</div>
})