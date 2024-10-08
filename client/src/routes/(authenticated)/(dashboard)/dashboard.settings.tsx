import { createFileRoute, createLink, useNavigate } from '@tanstack/react-router'
import { RowCard } from '../../../components/RowCard';
import { useAxios } from '../../../hooks/useAxios';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/settings')({
  component: Settings,
})

export type SettingsPageType = 'info' | 'privacy' | 'settings';

function Settings() {

  const navigate = useNavigate();
  const {AxiosGET} = useAxios();

  const logout = async() => {
    await AxiosGET('/logout');
    toast.success('Logged out successfully');
    navigate({to: '/home'});
  }

  return(
    <>
        <div 
          className='flex flex-col gap-4 items-start sm:[&>*:last-child]:hidden'>
            <RowCardLink
              to='/dashboard/settings_info'
              label='App Info'/>
            <RowCardLink
              to='/dashboard/settings_privacy'
              label='Privacy'/>
            <RowCard
              onClick={logout} 
              label='Log Out'/>
        </div>
    </>
  )
}

const RowCardLink = createLink(RowCard);