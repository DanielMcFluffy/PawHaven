import { createFileRoute } from '@tanstack/react-router'
import React from 'react';
import { editUserFormValidation } from '../../../utils/validation';
import { log } from '../../../utils';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';
import { useAxios } from '../../../hooks/useAxios';
import { useForm } from '../../../hooks/useForm';

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/profile')({
  component: Profile,
})

function Profile() {

  const {AxiosPOST} = useAxios();
  const {getUser} = useAuth();
  const user = getUser();

  const {
    formValue: editUserFormValue,
    setFormValue: setEditUserFormValue,
    onChangeHandler: editUserFormOnChangeHandler,
    error,
    formattedError,
    success, 
  } = useForm(editUserFormValidation, {
    email: user.email,
    username: user.username
  });


  const [usernameTouched, setUsernameTouched] = React.useState(false);
  const [emailTouched, setEmailTouched] = React.useState(false);

  const [isEditing, setIsEditing] = React.useState(false);

  const saveEdit = async() => {
    if (!isEditing) {
      return setIsEditing(true);
    }

    if (error) {
      return toast.error('Invalid format');
    }

    if (success && editUserFormValue.email === user.email) {
      toast.info('No changes');
      return setIsEditing(false);
    }
    
    if (success) {
      log('success', editUserFormValue);
      const response = await AxiosPOST('/users/', {email: editUserFormValue.email}, user.user_id);
      if (response.status === 200) {
        toast.success('Admin Updated');
      } else if (response.status === 202) {
        toast.info('No changes');
      } else {
        setEditUserFormValue({
          ...editUserFormValue,
          email: user.email,
        });
      }
      return setIsEditing(false);
    }
  }

  return(
    <>
      <div 
        className='flex flex-col gap-8 h-full'>
          <div 
            className='flex flex-col items-center bg-slate-50 sm:bg-3 w-full p-4 rounded-md'>
            <ProfilePhoto />
            <span
              className='mb-[-6px] font-info text-xs sm:font-2'
            >Verify to add photo</span>
          </div>
          <div 
            className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='flex sm:flex-col gap-4 items-center sm:items-start'>
              <label 
                htmlFor="username"
                className='min-w-[100px] sm:min-w-fit'>
                Username
              </label>
              <div 
                className='flex flex-col w-full'>
                <input
                  id="username" 
                  type="text"
                  placeholder='JohnDoe123'
                  className='input shadow-sm w-full'
                  onBlur={() => setUsernameTouched(true)}
                  value={editUserFormValue.username}
                  onChange={e => editUserFormOnChangeHandler(e, 'username')}
                  disabled={true} />
                { error && usernameTouched && <div
                  className='text-xs text-red-500 ml-2'
                >
                  {formattedError?.username?._errors[0]}
                </div>}
              </div>
            </div>
            <div className='flex sm:flex-col gap-4 items-center sm:items-start'>
              <label 
                htmlFor="email"
                className='min-w-[100px] sm:min-w-fit'>
                Email
              </label>
              <div 
                className='flex flex-col w-full'>
                <input
                  id='email' 
                  type="email"
                  placeholder='john@email.com'
                  className='input shadow-sm w-full'
                  value={editUserFormValue.email}
                  onChange={e => editUserFormOnChangeHandler(e, 'email')}
                  onBlur={() => setEmailTouched(true)}
                  disabled={!isEditing} />
                { error && emailTouched && <div
                  className='text-xs text-red-500 ml-2'
                  >
                  {formattedError?.email?._errors[0]}
                </div>}
              </div>
            </div>
          </div>
          <div 
            className='h-full flex flex-col gap-6 items-center justify-around'>
              <div 
                className='flex gap-6'>
                <button 
                  className='btn px-6'
                  onClick={saveEdit}
                  >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
                {isEditing && <button
                  onClick={() => setIsEditing(false)} 
                  className='btn btn-secondary px-6'>
                  Cancel
                </button>}
              </div>
            <div 
              className='text-left w-full flex flex-col gap-4 flex-1'>
              <div
                className='font-info text-xs'>id: {user.user_id}</div>
              <div
                className='font-info text-xs'>Last updated: {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'New User'}</div>
              <div
                className='font-info text-xs'>Registered: {new Date(user.created_at).toLocaleDateString()}</div>
            </div>
          </div>
      </div>
    </>
  )
}

const ProfilePhoto = () => {
  const editOverlay = React.useRef<HTMLDivElement>(null);

  return(
    <>
      <div
        onMouseEnter={() => {
          editOverlay.current!.style.backgroundColor = '#000000';
          editOverlay.current!.style.opacity = '0.4';
        }}
        onMouseLeave={() => {
          editOverlay.current!.style.backgroundColor = 'unset';
          editOverlay.current!.style.opacity = '0';
        }} 
        className='relative overflow-hidden rounded-full hover:cursor-pointer'>
        <img 
          src="/default-pfp.webp" 
          alt="default-pfp" 
          className='h-[80px]'/>
          <div
            ref={editOverlay} 
            className='absolute bottom-0 right-1/2 translate-x-1/2 bg-black bg-opacity-40 sm:hover:bg-black sm:hover:bg-opacity-40 w-full text-center font-2 text-sm transition-all ease-in-out'>
            Edit
          </div>
      </div>
    </>
  )
}