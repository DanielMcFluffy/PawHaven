import { createFileRoute } from '@tanstack/react-router';
import { BsXLg } from "react-icons/bs";
import { useState } from 'react';
import { createPortal } from 'react-dom';

export const Route = createFileRoute('/(auth)/login')({
  component: Form,
})

// Not really readable, just wanted to see how tailwind css could write a 2-in-1 form -- better to split this into 2 forms
function Form() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return(
    <>
      <div
        className={`flex justify-center items-center 
          ${showRegisterModal ? 'modal' : 'h-dvh bg-0'}`}>
        <div className={`bg-white ${showRegisterModal ? '' : 'shadow-md'} p-4 rounded flex flex-col gap-4 min-w-[300px]`}>
          <div
            className='text-2xl '
          >
            {showRegisterModal ? 'Create an Account' : 'Login'}
            {showRegisterModal && (<button
              onClick={() => setShowRegisterModal(x => !x)}
              className='absolute right-4 top-4'
            ><BsXLg/>
            </button>)}
            </div>
          <div className={`gap-4 w-full
            ${showRegisterModal ? 'grid grid-cols-2 sm:grid-cols-4' : 'flex flex-col'}`}>
            <div className='flex flex-col gap-2 col-span-2'>
              <label 
              className='font-info text-sm'
              htmlFor="username">Username</label>
              <input type="text" id='username' className=' border rounded px-2 py-1 focus:bg-slate-100 w-full' />
            </div>
            <div className='flex flex-col gap-2 col-span-2'>
              <label 
              className='font-info text-sm'
              htmlFor="password">Password</label>
              <input type="text" id='password' className=' border rounded px-2 py-1 focus:bg-slate-100 w-full' />
            </div>
          </div>
          {showRegisterModal && (<div className='flex flex-col gap-2'>
            <label 
            className='font-info text-sm'
            htmlFor="email">Email</label>
            <input type="text" id='email' 
            className='w-full border rounded px-2 py-1 focus:bg-slate-100'/>
          </div>) }
          <button
            className='w-full btn'
          >{showRegisterModal ? 'Register' : 'Login'}
          </button>
          { !showRegisterModal && (<div
            className='text-center font-info text-sm'
          >Don't have an account? Register <button 
          className='underline'
          onClick={() => setShowRegisterModal(x => !x)}
          >here</button></div>)}
        </div>
      </div>
      {showRegisterModal && createPortal(
        <Form/>, document.body
      )}
    </>
  )
}