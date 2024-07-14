import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <div className='text-red-500 bg-black'>Hello /!</div>
})