import { createLazyFileRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'
import { AxiosGET } from '../../../utils/axiosHttp';
import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { IconType } from 'react-icons';
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { GiArchiveResearch } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa";


import React from 'react';

export const Route = createLazyFileRoute('/(authenticated)/(dashboard)/dashboard')({
  component: Dashboard
})

function Dashboard() {

  return(
    <>
    <div className='flex flex-col bg-0 h-dvh'>
      <Toolbar />
      <main className='flex h-full'>
        <Sidebar /> <section className='h-full w-full px-6 py-4 bg-slate-50 rounded-lg shadow-md'><Outlet /></section>
      </main>
    </div>
    </>
  )
}

const Toolbar = () => {
  const navigate = useNavigate();

  const logout = async() => {
    await AxiosGET('/logout')
    navigate({to: '/home'});
  }

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
      <button onClick={logout} className='btn'>logout</button>
    </header>
      {/* mobile toolbar */}
    <header className='flex sm:hidden justify-between'>

    </header>
    </>
  )
}

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return(
    <>
      <aside className={`bg-2 h-full p-4 relative transition-[width] ${sidebarOpen ? 'w-[20ch]' : 'w-[15ch]'}`}>       
        
      <section className='flex flex-col gap-6'>
          {sidebarButtons.map((x, index) => (
            <SidebarButtonLink key={index} icon={x.icon} label={x.label} to={x.to} />
          ))}
        </section>
        <button className='absolute right-0 bottom-[50%] bg-slate-500'
        onClick={() => setSidebarOpen(x => !x)}>
          {sidebarOpen ? 'close' : 'open'}
        </button>
      </aside>
    </>
  )
}

type SidebarButtonProps = {
  icon: IconType;
  label: string;
  to?: string;
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

const SidebarButton = ({icon, label}: SidebarButtonProps) => {

  return (
    <>
      <button className='flex flex-col justify-center items-center hover:bg-white'>
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

const SidebarButtonLink = ({ icon, label, to }: SidebarButtonProps) => {
  if (!to) {
    return <SidebarButton icon={icon} label={label} />;
  }

  return (
    <Link to={to} className='flex flex-col justify-center items-center hover:bg-white'>
      <div>{React.createElement(icon)}</div>
      <div>{label}</div>
    </Link>
  );
};