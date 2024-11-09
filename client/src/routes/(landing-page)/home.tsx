import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { CiMenuBurger } from "react-icons/ci";
import React from 'react';
import { LoginModal } from '../../modals/LoginModal';
import { RegisterModal } from '../../modals/RegisterModal';
import { Modal } from '../../components/Modal';

export const Route = createFileRoute('/(landing-page)/home')({
  beforeLoad: async({context}) => {
    const cookieName = import.meta.env.VITE_COOKIE_NAME;
    // if cookie exists, check if the session is valid
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, _, removeCookie ] = context.cookie;

    if ((cookie as Record<string, string>)[cookieName]) {
      const {AxiosGET} = context.axios
      const response = await AxiosGET('/check-session')  
      if (response.status === 200) {
        throw redirect({
          to: '/dashboard'
        })
      } else {
        removeCookie(cookieName)
      }
    } 
  },
  component: Home
})

function Home() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);

  return (
    <>
    <div className='flex flex-col bg-0 h-dvh'
      onClick={() => {
        dropdownOpen ? setDropdownOpen(false) : undefined;
        showLoginModal ? setShowLoginModal(false): undefined;
        showRegisterModal ? setShowRegisterModal(false): undefined;
      }}
    >
      <Toolbar 
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        setShowLoginModal={setShowLoginModal}
      />
      <main className='h-full px-6 py-4'>
        <Outlet/>
      </main>
    </div>
    {
      <Modal
        title='Login'
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}>
          <LoginModal
            setShowRegisterModal={setShowRegisterModal} />
      </Modal>
    }
    {
      <Modal
        title='Register'
        showModal={showRegisterModal}
        setShowModal={setShowRegisterModal}>
        <RegisterModal 
          setShowRegisterModal={setShowRegisterModal}/>
      </Modal>
    }
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
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toolbar = ({dropdownOpen, setDropdownOpen, setShowLoginModal}: ToolbarProps) => {
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
        <button
          className='btn btn-secondary'
          onClick={() => setShowLoginModal(true)}
        >Login
        </button>
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
          <button
            className='hover:bg-slate-200 px-3 py-1.5 text-left'
            onClick={() => setShowLoginModal(true)}
          >Login
          </button>
          </div>
        </nav>
      </header>
    </>
  )
}