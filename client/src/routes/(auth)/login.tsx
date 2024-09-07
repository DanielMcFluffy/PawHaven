import { createFileRoute, Link } from '@tanstack/react-router';
import { BsXLg } from "react-icons/bs";
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '../../hooks/useForm';
import { loginFormValidation, registerFormValidation, TLoginForm, TRegisterForm } from '../../utils/validation';
import { useAuth } from '../../hooks/useAuth';

export const Route = createFileRoute('/(auth)/login')({
  component: Form,
})

// Not really readable, just wanted to see how tailwind css could write a 2-in-1 form -- better to split this into 2 forms
function Form() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginFormValue, setLoginFormValue] = useState<TLoginForm>({
    username: '',
    password: ''
  })
  const [registerFormValue, setRegisterFormValue] = useState<TRegisterForm>({
    username: '',
    password: '',
    email: '',
  })

  
  const loginFormResult = useForm(loginFormValidation, loginFormValue);
  const registerFormResult = useForm(registerFormValidation, registerFormValue);
  
  const { error: loginError, formattedError: loginErrorMessage } = loginFormResult;
  const { error: registerError, formattedError: registerErrorMessage } = registerFormResult;
  
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  
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

  const Login = async() => {
   await useAuth(loginFormValue).then(console.log)
  }
  
  return(
    <>
      { !showRegisterModal && <AuthToolbar /> }
      <main
        className={`flex justify-center items-center 
          ${showRegisterModal ? 'modal' : 'h-dvh bg-0'}`}>
        <section className={`bg-white ${showRegisterModal ? '' : 'shadow-md'} p-4 rounded flex flex-col gap-4 min-w-[300px]`}>
          <div
            className='text-2xl '
          >
            {showRegisterModal ? 'Create an Account' : 'Login'}
            {showRegisterModal && (<button
              onClick={() => {
                clearForm();
                setShowRegisterModal(x => !x);
              }}
              className='absolute right-4 top-4'
            ><BsXLg/>
            </button>)}
          </div>
          <div className={`gap-4 w-full
            ${showRegisterModal ? 'grid grid-cols-2 sm:grid-cols-4' : 'flex flex-col'}`}>
            <div className='flex flex-col col-span-2'>
              <label 
              className='font-info text-sm'
              htmlFor="username">Username</label>
              <input type="text" id='username' className=' border rounded px-2 py-1 focus:bg-slate-100 w-full'
              value={showRegisterModal ? registerFormValue.username : loginFormValue.username}
              onChange={(e) => showRegisterModal ?
                setRegisterFormValue(x => ({...x, username: e.target.value})) :
                setLoginFormValue(x => ({...x, username: e.target.value}))
              }
              onBlur={() => setUsernameTouched(true)} />
              { loginError && usernameTouched && <div
                className='text-xs text-red-500'
              >
                {loginErrorMessage?.username?._errors[0]}
              </div>}
            </div>
            <div className='flex flex-col col-span-2'>
              <label 
              className='font-info text-sm'
              htmlFor="password">Password</label>
              <input type="text" id='password' className=' border rounded px-2 py-1 focus:bg-slate-100 w-full'
              value={showRegisterModal ? registerFormValue.password : loginFormValue.password}
              onChange={(e) => showRegisterModal ?
                setRegisterFormValue(x => ({...x, password: e.target.value})) :
                setLoginFormValue(x => ({...x, password: e.target.value}))
              }
              onBlur={() => setPasswordTouched(true)} />
              { loginError && passwordTouched && <div
                className='text-xs text-red-500'
              >
                {loginErrorMessage?.password?._errors[0]}
              </div>}
            </div>
          </div>
          {showRegisterModal && 
          <div className='flex flex-col'>
            <label 
            className='font-info text-sm'
            htmlFor="email">Email</label>
            <input type="text" id='email' 
            className='w-full border rounded px-2 py-1 focus:bg-slate-100'
            value={registerFormValue.email}
            onChange={(e) => showRegisterModal ?
              setRegisterFormValue(x => ({...x, email: e.target.value})) :
              undefined
            }
            onBlur={() => setEmailTouched(true)}/>
              { registerError && emailTouched && <div
                className='text-xs text-red-500'
              >
                {registerErrorMessage?.email?._errors[0]}
              </div>}
          </div>
          
         }
          <button
            onClick={() => Login()}
            className='w-full btn'
          >{showRegisterModal ? 'Register' : 'Login'}
          </button>
          { !showRegisterModal && (<div
            className='text-center font-info text-sm'
          >Don't have an account? Register <button 
          className='underline'
          onClick={() => {
            !showRegisterModal && setShowRegisterModal(x => !x);
            !showRegisterModal && clearForm();
          }}
          >here</button></div>)}
        </section>
      </main>
      {showRegisterModal && createPortal(
        <Form/>, document.body
      )}
    </>
  )
}

const AuthToolbar = () => {

  return(
    <>
      <header 
        className='flex-row justify-between px-6 py-4 font-info bg-0'
      >
        <Link
          to='/home/main'
        >
          Logo
        </Link>
      </header>
    </>
  )
}