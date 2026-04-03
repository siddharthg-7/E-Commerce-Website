import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = currentState === 'Login' 
        ? 'http://localhost:4000/api/user/login'
        : 'http://localhost:4000/api/user/register';
      
      const payload = currentState === 'Login'
        ? { email, password }
        : { name, email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        toast.success(data.message || `${currentState} successful!`, {
          position: "top-right",
          autoClose: 3000,
        });
        console.log('Token received:', data.token);
        // Reset form
        setEmail('');
        setPassword('');
        setName('');
      } else {
        toast.error(data.message || 'Something went wrong', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Server error. Please try again', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onInvalid={(event) => event.target.setCustomValidity('Please fill out this field')}
        onInput={(event) => event.target.setCustomValidity('')}
      />
      {currentState === 'Login' && (
        <button type='button' className='w-full text-right text-sm text-gray-600'>
          Forgot password?
        </button>
      )}
      <button className='bg-black text-white font-light px-8 py-2 mt-4' disabled={loading}>
        {loading ? 'Loading...' : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
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