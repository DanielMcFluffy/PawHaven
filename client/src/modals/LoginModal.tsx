import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "../hooks/useForm";
import { loginFormValidation } from "../utils/validation";
import { useAuth } from "../hooks/useAuth";
import React from "react";

export type LoginModalProps = {
  setShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const LoginModal = ({setShowRegisterModal}: LoginModalProps) => {
  const {login} = useAuth();
  const {
    formValue: loginFormValue,
    setFormValue: setLoginFormValue,
    formInputsTouched: loginFormTouched,
    resetFormInputsTouched: resetLoginFormTouched,
    onBlurHandler: loginFormOnBlurHandler,
    onChangeHandler: loginFormOnChangeHandler,
    error: loginError,
    formattedError: loginErrorMessage
  } = useForm(loginFormValidation);

  const [showPassword, setShowPassword] = React.useState(false);
  const passwordInput = React.useRef<HTMLDivElement>(null)

  const clearForm = () => {
    setLoginFormValue({
      username: '',
      password: ''
    });
    resetLoginFormTouched();
  }
    return(
        <>
            <form 
            className='flex flex-col gap-2'
            onSubmit={e =>{
                e.preventDefault();
                if (!loginFormValue) {return;}
                const {username, password} = loginFormValue;
                return login(username, password);
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
                onBlur={() => loginFormOnBlurHandler('username')}
                value={loginFormValue.username}
                onChange={e => loginFormOnChangeHandler(e, 'username')}
                />
                { loginError && loginFormTouched.username && <div
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
                    loginFormOnBlurHandler('password');
                    }}
                    value={loginFormValue.password}
                    onChange={e => loginFormOnChangeHandler(e, 'password')}
                />
                <button type='button' onClick={() => setShowPassword(x => !x)}>
                    {showPassword ? <FaRegEye/> : <FaEyeSlash/>}
                </button>
                </div>
                { loginError && loginFormTouched.password && <div
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
        </>
    )
}