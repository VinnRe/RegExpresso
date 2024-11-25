import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles/Signup.css';
import Logo from '../assets/header_regex_only.svg';
import Divider from '../assets/divider_or.svg';

const Signup = () => {
    const { handleSignup } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const checkPass = () => {
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkPass()) {
            try {
                const isSuccess = await handleSignup(username, email, password);
    
                if (isSuccess) {
                    navigate('/home');
                } else {
                    console.error('Signup Failed. Please check all the fields.');
                }
            } catch (error) {
                console.error('An error occurred. Please try again later.');
            }
        } else {
            console.log('Validation failed.');
        }
    };

    return (
        <main className="signupBody">
            <img src={Logo} alt="" className="logoS" />
            <form action="" className="signupForm" onSubmit={handleSubmit}>
                <h1 className="signupTitle">Get started.</h1>
                <p className="signupP">Username</p>
                <input
                    type="text"
                    className="signupInput usrnmSignup"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p className="signupP">Email</p>
                <input
                    type="email"
                    className="signupInput emailSignup"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="signupP">Password</p>
                <input
                    type="password"
                    className="signupInput passSignup"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="signupP">Re-enter Password</p>
                <input
                    type="password"
                    className="signupInput confPassSignup"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button className="submitsignupBtn">Create account</button>
                <p className="signupP loginSwitch">
                    Already have an account?{' '}
                    <a className="logSwitchBtn" href="/login">
                        Login
                    </a>
                </p>
                <img src={Divider} alt="divider" className="dividerS" />
                <a className="conSwitchBtnS" href="/home">
                    Continue as Guest.
                </a>
            </form>
        </main>
    );
};

export default Signup;
