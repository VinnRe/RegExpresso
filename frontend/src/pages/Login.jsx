import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './styles/Login.css'
import Logo from '../assets/header_regex_only.svg'
import Divider from '../assets/divider_or.svg'

const Login = () => {
    const { handleLogin } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const isSuccess = await handleLogin(username, password);
      
            if (isSuccess) {
              navigate('/home');
            } else {
                console.error('Login failed. Please check your credentials.');
            }
          } catch (error) {
            console.error('An error occurred. Please try again later.');
          }
    }

    return (
        <main className="loginBody">
            <img src={Logo} alt="" className="logoL" />
            <form action="" className='loginForm' onSubmit={handleSubmit}>
                <h1 className="loginTitle">Welcome Back!</h1>
                <p className='loginP'>Username</p>
                <input type="text" className="loginInput usrnmLogin" 
                        value={username} onChange={(e) => setUsername(e.target.value)}
                />
                <p className='loginP'>Password</p>
                <input type="password" className="loginInput passLogin" 
                        value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <button className="submitLoginBtn">Login</button>
                <p className="loginP signupSwitch">Don't have an account? <a className='signSwitchBtn' href='/signup'>Create account</a></p>
                <img src={Divider} alt="divider" className='dividerL' />
                <a className='conSwitchBtnL' href='/home'>Continue as Guest.</a>
            </form>
        </main>
    )

}

export default Login