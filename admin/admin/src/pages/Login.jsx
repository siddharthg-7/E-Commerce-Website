import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { backendUrl } from '../App'

const Login = ({ setToken }) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState(''); 
    const [error, setError] = React.useState('');

    const onSubmithandler = async (e) => {   
        try{

            e.preventDefault();
            setError('');
            const response = await axios.post(backendUrl+'/api/user/admin/login', {
                email: email.trim(),
                password,
            });
            if (response.data.success) {
                console.log(response.data);
                const { token } = response.data;
                localStorage.setItem('token', token);
                setToken(token);
                window.location.reload();
            } else {
                tost.error(response.data.message || 'Login failed. Check your credentials and try again.', {
                    position: "top-right",
                    autoClose: 3000,
                }); 
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(error?.response?.data?.message || 'Login failed. Check your credentials and try again.');
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin panel </h1>
            <form  onSubmit={onSubmithandler} className='space-y-4' >
                <div className='mb-2 min-w-72'>
                    <p className='text-sm font-medium text-gray-300 mb-2'>Email Adress</p>
                    <input  onChange={(e) => setEmail(e.target.value)}  value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline' type="email" placeholder="your@email.com" required/>
                </div>
                <div className='mb-2 min-w-72' >
                    <p className='text-sm font-medium text-gray-300 mb-2'>Password</p>
                    <input  onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline' type="password" placeholder="Enter Your Password" required/>
                </div>
                {error && <p className='text-sm text-red-500'>{error}</p>}
                <button type="submit" className='mt-2 w-full py-2 py-4 rounded-md text-white bg-black '>
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login