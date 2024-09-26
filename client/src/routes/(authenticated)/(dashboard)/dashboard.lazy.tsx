import { createLazyFileRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'
import { FaHome } from "react-icons/fa";
import { IconType } from 'react-icons';
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { GiArchiveResearch } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa";


import React from 'react';
import { useAxios } from '../../../hooks/useAxios';

export const Route = createLazyFileRoute('/(authenticated)/(dashboard)/dashboard')({
  component: Dashboard
})

function Dashboard() {

  return(
    <>
    <div className='flex flex-col bg-0 h-dvh'>
      <Toolbar />
      <main className='flex h-full'>
        <Sidebar /> <section className='h-full w-full px-6 py-4 bg-slate-50 rounded-tl-xl rounded-bl-xl shadow-md'><Outlet /></section>
      </main>
    </div>
    </>
  )
}

const Toolbar = () => {
  return(
    <>
    {/* desktop toolbar */}
    <header className='flex-row justify-between px-6 py-4 font-info hidden sm:flex'>
      <Link
            to='/dashboard'
          >
            <img src='/logo-blue.png' alt="logo"
              height='220px'
              width='220px' />
      </Link>
    </header>
      {/* mobile toolbar */}
    <header className='flex sm:hidden justify-between'>

    </header>
    </>
  )
}

const Sidebar = () => {

  const navigate = useNavigate();
  const {AxiosGET} = useAxios();

  const logout = async() => {
    await AxiosGET('/logout');
    navigate({to: '/home'});
  }

  return(
    <>
      <aside className={`bg-0 h-full transition-[width] ease-in-out 'w-[15ch]'`}>       
        
      <section className='flex flex-col'>
          {sidebarButtons.map((x, index) => ( index < (sidebarButtons.length - 1) ?
            <SidebarButtonLink key={index} icon={x.icon} label={x.label} to={x.to} /> :
            <SidebarButtonLink key={index} icon={x.icon} label={x.label} callback={logout} /> 
          ))}
        </section>
      </aside>
    </>
  )
}

type SidebarButtonProps = {
  icon: IconType;
  label: string;
  to?: string;
  callback?: () => void;
}

const sidebarButtons: SidebarButtonProps[] = [
  {icon: FaHome, label: 'Dashboard', to: '/dashboard'},
  {icon: FaCalendarDay, label: 'Appointments', to: '/dashboard/appointments'},
  {icon: MdPets, label: 'Pets', to: '/dashboard/pets'},
  {icon: GiArchiveResearch, label: 'Medicines', to: '/dashboard/medicines'},
  {icon: CgProfile, label: 'Profile', to: '/dashboard/profile'},
  {icon: IoIosSettings, label: 'Settings', to: '/dashboard/settings'},
  {icon: CiLogout, label: 'Logout'},
]

const SidebarButton = ({icon, label, callback}: SidebarButtonProps) => {

  return (
    <>
      <button className='flex flex-col justify-center items-center hover:bg-slate-300 px-2 py-4 rounded-lg' onClick={callback}>
        <div className=''>
          {React.createElement(icon)}
        </div>
        <div>
          {label}
        </div>
      </button>
    </>
  )
}

const SidebarActiveProps: React.AnchorHTMLAttributes<HTMLAnchorElement> | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>) | undefined = {
  style: {
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ADBBDA',
    borderRadius: '0.5rem',
  },
};

const SidebarButtonLink = ({ icon, label, to, callback }: SidebarButtonProps) => {
  if (!to) {
    return <SidebarButton icon={icon} label={label} callback={callback} />;
  }

  return (
    <Link to={to} activeProps={SidebarActiveProps} activeOptions={{exact: true}} className='flex flex-col justify-center items-center hover:bg-slate-300 hover:rounded-md px-2 py-4'>
      <div>{React.createElement(icon)}</div>
      <div>{label}</div>
    </Link>
  );
};