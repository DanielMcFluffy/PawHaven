import { createFileRoute, createLink, Outlet, useChildMatches } from '@tanstack/react-router'
import { RowCard } from '../../../components/RowCard';
import { useAuth } from '../../../hooks/useAuth';

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/settings')({
  component: Settings,
})

function Settings() {

  const {logout} = useAuth()

    // Check if the current route matches any child route
  const childMatch = useChildMatches({
    select: (match) => match.length
  })
  return(
    <>
      {childMatch === 0 && 
        <div 
          className='flex flex-col gap-4 items-start sm:[&>*:last-child]:hidden'>
            <RowCardLink
              to='/dashboard/settings/info'
              label='App Info'/>
            <RowCardLink
              to='/dashboard/settings/privacy'
              label='Privacy'/>
            <RowCard
              onClick={logout} 
              label='Log Out'/>
        </div>
      }
          <Outlet />
    </>
  )
}

const RowCardLink = createLink(RowCard);