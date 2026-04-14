import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <div>
            <h1>Admin panel </h1>
            <form >
                <div>
                    <p>Email Adress</p>
                    <input type="email" placeholder="your@email.com" required/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" placeholder="Enter Your Password" required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login