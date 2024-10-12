import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { CiMenuBurger } from "react-icons/ci";
import { FaEyeSlash, FaRegEye  } from "react-icons/fa";
import { createPortal } from 'react-dom';
import { loginFormValidation, registerFormValidation, TLoginForm, TRegisterForm } from '../../utils/validation';
import { validateFormWithZod } from '../../utils/validateFormWithZod';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ErrorResponse } from '../../models/Response';

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
    {showLoginModal && createPortal(
      <AuthModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal}
      />  , document.body
    )}
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

type AuthModalProps = {
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  showRegisterModal: boolean;
  setShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({showLoginModal, setShowLoginModal, showRegisterModal, setShowRegisterModal}: AuthModalProps) => {
  const {login, register} = useAuth();

  const [loginFormValue, setLoginFormValue] = React.useState<TLoginForm>({
    username: '',
    password: ''
  })
  const [registerFormValue, setRegisterFormValue] = React.useState<TRegisterForm>({
    username: '',
    password: '',
    email: '',
  })
  
  const loginFormResult = validateFormWithZod(loginFormValidation, loginFormValue);
  const registerFormResult = validateFormWithZod(registerFormValidation, registerFormValue);
  
  const { error: loginError, formattedError: loginErrorMessage } = loginFormResult;
  const { error: registerError, formattedError: registerErrorMessage } = registerFormResult;
  
  const [usernameTouched, setUsernameTouched] = React.useState(false);
  const [passwordTouched, setPasswordTouched] = React.useState(false);
  const [emailTouched, setEmailTouched] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const passwordInput = React.useRef<HTMLDivElement>(null)
  
  const clearForm = () => {
    setLoginFormValue({
      username: '',
      password: ''
    });
    setRegisterFormValue({
      username: '',
      password: '',
      email: ''
    });
    setUsernameTouched(false);
    setPasswordTouched(false);
    setEmailTouched(false);
  }

  if (showLoginModal && !showRegisterModal) {
    return(
      <>
      <section className='modal flex flex-col gap-4 min-w-[300px]'>
        <button
          onClick={() => setShowLoginModal(false)} 
          className='absolute top-2 right-4'>
          X
        </button>
        <header>
          <span className='font-medium text-xl'>Login</span>
        </header>
        <form 
          className='flex flex-col gap-2'
          onSubmit={e =>{
            e.preventDefault();
            const {username, password} = loginFormValue;
            login(username, password);
          }}
        >
          <div className='flex flex-col gap-1'>
            <label
              className='ml-2'
              htmlFor="username">Username</label>
            <input
              id='username'
              className='input' 
              type="text"
              placeholder='John Doe'
              onBlur={() => setUsernameTouched(true)}
              value={loginFormValue.username}
              onChange={(e) => setLoginFormValue(x => ({...x, username: e.target.value}))}
            />
            { loginError && usernameTouched && <div
                className='text-xs text-red-500 ml-2'
              >
                {loginErrorMessage?.username?._errors[0]}
              </div>}
          </div>
          <div className='flex flex-col gap-1'>
            <label
              className='ml-2'
              htmlFor="password">Password</label>
            <div ref={passwordInput} className='input focus:outline-none flex' >
              <input
                id='password'
                className='bg-transparent focus:outline-none flex-1'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                onFocus={() => passwordInput.current!.style.backgroundColor = '#e2e8f0'}
                onBlur={() => {
                  passwordInput.current!.style.backgroundColor = '#f1f5f9';
                  setPasswordTouched(true);
                }}
                value={loginFormValue.password}
                onChange={(e) => setLoginFormValue(x => ({...x, password: e.target.value}))}
              />
              <button type='button' onClick={() => setShowPassword(x => !x)}>
                {showPassword ? <FaRegEye/> : <FaEyeSlash/>}
              </button>
            </div>
            { loginError && passwordTouched && <div
              className='text-xs text-red-500 ml-2'
            >
              {loginErrorMessage?.password?._errors[0]}
            </div>}
          </div>
          <button type='submit' className="btn self-end">
            Login
          </button>
          <p className='font-info text-sm text-center'>
            Don't have an account? Register <button type='button' onClick={() => {
              setShowRegisterModal(true);
              clearForm();
              }} className='underline text-blue-500 cursor-pointer'>here</button>
          </p>
        </form>
      </section>

      {showRegisterModal && createPortal(
        <AuthModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal} />, document.body
      )}
      </>
    )
  }

  if (showLoginModal && showRegisterModal) {
    return(
      <>
      <section className='modal flex flex-col gap-4 min-w-[300px]'>
        <button
          onClick={() => setShowLoginModal(false)} 
          className='absolute top-2 right-4'>
          X
        </button>
        <header>
          <span className='font-medium text-xl'>Register</span>
        </header>
        <form className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <label
              className='ml-2'
              htmlFor="username">Username</label>
            <input
              id='username'
              className='input' 
              type="text"
              placeholder='John Doe'
              onBlur={() => setUsernameTouched(true)}
              value={registerFormValue.username}
              onChange={(e) => setRegisterFormValue(x => ({...x, username: e.target.value}))}
            />
              { registerError && usernameTouched && <div
                className='text-xs text-red-500 ml-2'
              >
                {registerErrorMessage?.username?._errors[0]}
              </div>}
          </div>
          <div className='flex flex-col gap-1'>
            <label
              className='ml-2'
              htmlFor="password">Password
            </label>
            <div ref={passwordInput} className='input focus:outline-none flex'>
              <input
                id='password'
                className='bg-transparent focus:outline-none flex-1'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                onFocus={() => passwordInput.current!.style.backgroundColor = '#e2e8f0'}
                onBlur={() => {
                  passwordInput.current!.style.backgroundColor = '#f1f5f9';
                  setPasswordTouched(true);
                }}
                value={registerFormValue.password}
                onChange={(e) => setRegisterFormValue(x => ({...x, password: e.target.value}))}
              />
              <button type='button' onClick={() => setShowPassword(x => !x)}>
                {showPassword ? <FaRegEye/> : <FaEyeSlash/>}
              </button>
            </div>
              { registerError && passwordTouched && <div
                className='text-xs text-red-500 ml-2'
              >
                {registerErrorMessage?.password?._errors[0]}
              </div>}
          </div>
          <div className='flex flex-col gap-1'>
            <label
              className='ml-2'
              htmlFor="email">Email</label>
            <input
              id='email'
              className='input' 
              type="email"
              placeholder='John@Doe.com'
              value={registerFormValue.email}
              onChange={(e) => setRegisterFormValue(x => ({...x, email: e.target.value}))}
              onBlur={() => setEmailTouched(true)}
            />
              { registerError && emailTouched && <div
                className='text-xs text-red-500 ml-2'
              >
                {registerErrorMessage?.email?._errors[0]}
              </div>}
          </div>
          <button onClick={async(e) => {
            e.preventDefault();
            const {username, password, email} = registerFormValue;
            const response = await register(username, password, email);
            (response as unknown as ErrorResponse).status !== 200 ? clearForm() : undefined;
            }} className="btn self-end">
            Register
          </button>
          <p className='font-info text-sm text-center'>
            Have an account? Login <button type='button' onClick={() => {
              setShowRegisterModal(false);
              clearForm();
              }} className='underline text-blue-500'>here</button>
          </p>
        </form>
      </section>

      {showLoginModal && !showRegisterModal && createPortal(
        <AuthModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal} />, document.body
      )}
      </>
    )
  }
  return null;
}