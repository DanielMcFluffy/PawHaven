import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'
import { FaHome } from "react-icons/fa";
import { IconType } from 'react-icons';
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { GiArchiveResearch } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa";
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';

export const Route = createLazyFileRoute('/(authenticated)/(dashboard)/dashboard')({
  component: Dashboard
})

function Dashboard() {

  return(
    <>
    <div className='flex flex-col bg-0'>
      <Toolbar />
      <main className='flex h-dvh'>
        <Sidebar 
        /> 
        <section className='w-full pb-[11ch] pt-4 px-4 sm:py-4 sm:px-6 bg-slate-200 sm:bg-slate-50 sm:rounded-tl-xl sm:rounded-bl-xl shadow-md sm:min-w-[unset] overflow-auto'><Outlet /></section>
      </main>
      <Navbar 
      />
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
    </>
  )
}

const Navbar = () => {
  const navbarRef = React.useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (navbarRef.current) {
      navbarRef.current.scrollBy({ left: window.innerWidth * 0.50, behavior: 'smooth' });
    }
  };
  const handleScrollLeft = () => {
    if (navbarRef.current) {
      navbarRef.current.scrollBy({ left: -window.innerWidth * 0.25, behavior: 'smooth' });
    }
  };

  return(
    <>
      <footer
        ref={navbarRef}
        className='fixed left-0 right-0 bottom-0 h-[10ch] bg-1 overflow-auto flex sm:hidden items-center'
      >
          {navigationButtons.map((x, index) => ( index < (navigationButtons.length - 1) ?
            <NavbarButtonLink key={index} icon={x.icon} exact={x.exact} to={x.to} callback={() => {
              if (index === 3) handleScrollRight();
              else if (index < 3) handleScrollLeft();
            }}/> :
            ''
          ))}
      </footer>
    </>
  )
}

const Sidebar = () => {

  const {logout} = useAuth();

  return(
    <>
      <aside className={`bg-0 h-full transition-[width] ease-in-out 'w-[15ch]' hidden sm:block`}>       
        
      <section className='flex flex-col'>
          {navigationButtons.map((x, index) => ( index < (navigationButtons.length - 1) ?
            <SidebarButtonLink key={index} icon={x.icon} label={x.label} to={x.to} exact={x.exact} /> :
            <SidebarButtonLink key={index} icon={x.icon} label={x.label} callback={logout} /> 
          ))}
        </section>
      </aside>
    </>
  )
}

type NavigationButtonProps = {
  icon: IconType;
  label: string;
  to?: string;
  exact?: boolean;
  callback?: () => void;
}

const navigationButtons: NavigationButtonProps[] = [
  {icon: FaHome, label: 'Dashboard', to: '/dashboard'},
  {icon: FaCalendarDay, label: 'Appointments', to: '/dashboard/appointments'},
  {icon: MdPets, label: 'Pets', to: '/dashboard/pets'},
  {icon: GiArchiveResearch, label: 'Medicines', to: '/dashboard/medicines'},
  {icon: CgProfile, label: 'Profile', to: '/dashboard/profile'},
  {icon: IoIosSettings, label: 'Settings', to: '/dashboard/settings', exact: false},
  {icon: CiLogout, label: 'Logout'},
]

const NavbarButtonLink = ({icon, to, callback, exact = true}: Omit<NavigationButtonProps, 'label'>) => {

  return(
    <>
      <Link
        className='min-w-[25%] text-2xl flex justify-center text-[#ADBBDA]' 
        to={to}
        activeProps={navbarActiveProps}
        activeOptions={{exact}}
        onClick={callback}>
        {React.createElement(icon)}
      </Link>
    </>
  )
}

const navbarActiveProps: React.AnchorHTMLAttributes<HTMLAnchorElement> | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>) | undefined = {
  style: {
    color: '#3D52A0',
  },
};

const SidebarButton = ({icon, label, callback}: NavigationButtonProps) => {
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

const sidebarActiveProps: React.AnchorHTMLAttributes<HTMLAnchorElement> | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>) | undefined = {
  style: {
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ADBBDA',
    borderRadius: '0.5rem',
  },
};

const SidebarButtonLink = ({ icon, label, to, callback, exact = true }: NavigationButtonProps) => {
  if (!to) {
    return <SidebarButton icon={icon} label={label} callback={callback} />;
  }

  return (
    <Link to={to} activeProps={sidebarActiveProps} activeOptions={{exact}} className='flex flex-col justify-center items-center hover:bg-slate-300 hover:rounded-md px-2 py-4'>
      <div>{React.createElement(icon)}</div>
      <div>{label}</div>
    </Link>
  );
};