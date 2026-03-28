import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 mx-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center  mb-2 mt-10 gap-2'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Signup' && (
        <input
          type="text"
          placeholder='Username'
          className='w-full px-3 py-2 border border-gray-800'
          required
          onInvalid={(event) => event.target.setCustomValidity('Please fill out this field')}
          onInput={(event) => event.target.setCustomValidity('')}
        />
      )}
      
      <input
        type="email"
        placeholder='Email'
        className='w-full px-3 py-2 border border-gray-800'
        pattern='[^\s@]+@[^\s@]+\.[^\s@]+'
        required
        onInvalid={(event) => {
          if (!event.target.value) {
            event.target.setCustomValidity('Please fill out this field');
          } else {
            event.target.setCustomValidity("Please include an '@' in the email address");
          }
        }}
        onInput={(event) => event.target.setCustomValidity('')}
      />
      <input
        type="password"
        placeholder='Password'
        className='w-full px-3 py-2 border border-gray-800'
        required
        onInvalid={(event) => event.target.setCustomValidity('Please fill out this field')}
        onInput={(event) => event.target.setCustomValidity('')}
      />
      {currentState === 'Login' && (
        <button type='button' className='w-full text-right text-sm text-gray-600'>
          Forgot password?
        </button>
      )}
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

      {currentState === 'Login' ? (
        <p className='text-sm text-gray-600'>
          Don&apos;t have an account?{' '}
          <button type='button' onClick={() => setCurrentState('Signup')} className='text-gray-800 font-medium'>
            Signup
          </button>
        </p>
      ) : (
        <p className='text-sm text-gray-600'>
          Already have an account?{' '}
          <button type='button' onClick={() => setCurrentState('Login')} className='text-gray-800 font-medium'>
            Login
          </button>
        </p>
      )}
    </form>
  )
}

export default Login