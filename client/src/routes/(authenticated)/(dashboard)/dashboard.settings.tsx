import { createFileRoute, createLink, Outlet, useChildMatches, useNavigate } from '@tanstack/react-router'
import { RowCard } from '../../../components/RowCard';
import { useAxios } from '../../../hooks/useAxios';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/settings')({
  component: Settings,
})

function Settings() {
  const navigate = useNavigate();
  const {AxiosGET} = useAxios();

    // Check if the current route matches any child route
  const childMatch = useChildMatches({
    select: (match) => match.length
  })
  const logout = async() => {
    await AxiosGET('/logout');
    toast.success('Logged out successfully');
    navigate({to: '/home'});
  }

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