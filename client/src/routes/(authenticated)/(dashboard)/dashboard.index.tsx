import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/')({
  component: Index
})

function Index() {
  return(
    <>
      <div>
        Hello
      </div>
    </>
  )
}