import React from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "../hooks/useForm";
import { ErrorResponse } from "../models/Response";
import { registerFormValidation } from "../utils/validation";
import { useAuth } from "../hooks/useAuth";

type RegisterModalProps = {
  setShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const RegisterModal = ({setShowRegisterModal}: RegisterModalProps) => {
  const {register} = useAuth();
  const {
    formValue: registerFormValue,
    setFormValue: setRegisterFormValue,
    formInputsTouched: registerFormTouched,
    resetFormInputsTouched: resetRegisterFormTouched,
    onBlurHandler: registerFormOnBlurHandler,
    onChangeHandler: registerFormOnChangeHandler,
    error: registerError,
    formattedError: registerErrorMessage
  } = useForm(registerFormValidation);

  const [showPassword, setShowPassword] = React.useState(false);
  const passwordInput = React.useRef<HTMLDivElement>(null)
  const clearForm = () => {
    setRegisterFormValue({
      username: '',
      password: '',
      email: ''
    });
    resetRegisterFormTouched();
  }
  return(
        <>
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
                onBlur={() => registerFormOnBlurHandler('username')}
                value={registerFormValue.username}
                onChange={e => registerFormOnChangeHandler(e, 'username')}
                />
                { registerError && registerFormTouched.username && <div
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
                    registerFormOnBlurHandler('password')
                    }}
                    value={registerFormValue.password}
                    onChange={e => registerFormOnChangeHandler(e, 'password')}
                />
                <button type='button' onClick={() => setShowPassword(x => !x)}>
                    {showPassword ? <FaRegEye/> : <FaEyeSlash/>}
                </button>
                </div>
                { registerError && registerFormTouched.password && <div
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
                onChange={e => registerFormOnChangeHandler(e, 'email')}
                onBlur={() => registerFormOnBlurHandler('email')}
                />
                { registerError && registerFormTouched.email && <div
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
        </>
  )
}