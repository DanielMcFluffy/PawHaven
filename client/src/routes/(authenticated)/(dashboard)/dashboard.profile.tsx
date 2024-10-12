import { createFileRoute } from '@tanstack/react-router'
import React from 'react';
import { editUserFormValidation, TEditUserForm } from '../../../utils/validation';
import { validateFormWithZod } from '../../../utils/validateFormWithZod';
import { log } from '../../../utils';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';
import { useAxios } from '../../../hooks/useAxios';

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/profile')({
  component: Profile,
})

function Profile() {

  const {AxiosPOST} = useAxios();
  const {getUser} = useAuth();
  const user = getUser();

  const [editUserFormValue, setEditUserFormValue] = React.useState<TEditUserForm>({
    username: user.username,
    email: user.email
  });

  const editUserFormResult = validateFormWithZod(editUserFormValidation, editUserFormValue);
  const {error, formattedError, success} = editUserFormResult;

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
        return setIsEditing(false);
      } else {
        setEditUserFormValue({
          ...editUserFormValue,
          email: user.email,
        });
        return setIsEditing(false);
      }
    }
  }

  return(
    <>
      <div 
        className='flex flex-col gap-8 h-full'>
          <div 
            className='self-center'>
            profile image
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
                  onChange={(e) => setEditUserFormValue(x => ({...x, username: e.target.value}))}
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
                  onChange={(e) => setEditUserFormValue(x => ({...x, email: e.target.value}))}
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
              className='text-left w-full flex flex-col gap-4'>
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