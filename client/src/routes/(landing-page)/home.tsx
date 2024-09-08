import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { CiMenuBurger } from "react-icons/ci";
import { useState } from 'react';

export const Route = createFileRoute('/(landing-page)/home')({
  component: Home
})

function Home() {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
    <div className='flex flex-col bg-0 h-dvh'
      onClick={() => {
        dropdownOpen ? setDropdownOpen(false) : undefined
      }}
    >
      <Toolbar 
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
      />
      <main className='h-full px-6 py-4'>
        <Outlet/>
      </main>
    </div>
    </>
  )
}

const activeProps: React.AnchorHTMLAttributes<HTMLAnchorElement> | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>) | undefined = {
  'style': {
    color: '#2F80ED',
    fontWeight: 'bold'
  }
}

type ToolbarProps = {
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toolbar = ({dropdownOpen, setDropdownOpen}: ToolbarProps) => {

  return(
    <>
    {/* desktop toolbar */}
      <header className='flex-row justify-between px-6 py-4 font-info hidden sm:flex'>
        <Link
          to='/home/main'
        >
          <img src='/logo-blue.png' alt="logo"
            height='220px'
            width='220px' />
        </Link>
        <div className='flex flex-row gap-8'>
          <Link
            
            to='/home/main'
            activeProps={activeProps}
          >
            Home
          </Link>
          <Link
            to='/home/service'
            activeProps={activeProps}
          >
            Services
          </Link>
          <Link 
            to='/home/about'
            activeProps={activeProps}
          >
            About
          </Link>
        </div>
        <Link
          to='/login'
          className='btn btn-secondary'
        >Login
        </Link>
      </header>
      {/* mobile toolbar */}
      <header className='flex sm:hidden justify-between'>
        <Link
          to='/home/main'
          className='p-4'
        >
          <img src='/logo-blue.png' alt="logo"
            height='220px'
            width='220px' />
        </Link>
        <nav className={`relative px-4 ${dropdownOpen ? 'bg-slate-300' : ''}`}>
          <button
            className='align-middle h-full'
            onClick={() => setDropdownOpen(x => !x)}
          >
              <CiMenuBurger size={'1.5rem'}/>
          </button>
          <div
            className={`absolute right-0 rounded shadow-md bg-slate-50 flex-col
              ${dropdownOpen ? 'flex' : 'hidden'}`}
          >
          <Link
            to='/home/service'
            className='hover:bg-slate-200 px-3 py-1.5'
            activeProps={activeProps}
          >
            Services
          </Link>
          <Link 
            to='/home/about'
            className='hover:bg-slate-200 px-3 py-1.5'
            activeProps={activeProps}
          >
            About
          </Link>
          <Link 
            to='/login'
            className='hover:bg-slate-200 px-3 py-1.5'
            activeProps={activeProps}
          >
            Login
          </Link>
          </div>
        </nav>
      </header>
    </>
  )
}