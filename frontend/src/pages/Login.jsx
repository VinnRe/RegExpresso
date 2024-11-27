import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles/AuthForm.css';
import Logo from '../assets/header_regex_only.svg';
import Divider from '../assets/divider_or.svg';

const Login = () => {
    const { handleLogin } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);


    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const validatePassword = (password) => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
        } else {
            setPasswordError('');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isSuccess = await handleLogin(username, password);

            if (isSuccess) {
                navigate('/home');
            } else {
                console.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('An error occurred. Please try again later.', error);
        }
    };

    return (
        <main className="auth auth--login">
            <img src={Logo} alt="RegExpresso Logo" className="auth__logo" />
            <form autoComplete="off" action="" className="auth__form" onSubmit={handleSubmit}>
                <h1 className="auth__title auth__login-title">Welcome Back!</h1>

                <div className="auth__field">
                    <input
                        id='input-username'
                        type="text"
                        className="auth__input auth__input--username"
                        value={username}
                        placeholder=" "
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor='input-username' className="auth__label">Username</label>
                </div>

                <div className={`auth__field ${passwordError ? 'auth__field--error' : ''}`}>
                    <input
                        id='input-password'
                        type={showPassword ? 'text' : 'password'}
                        className="auth__input auth__input--password"
                        value={password}
                        placeholder=" "
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                    />

                    <label htmlFor='input-password' className={`auth__label ${passwordError ? 'auth__label--error' : ''}`}>
                        {passwordError || 'Password'}
                    </label>
                    <span
                        className="material-symbols-outlined auth__toggle-password"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                </div>

                <button className="auth__button auth__button--submit" disabled={passwordError}>
                    Login
                </button>

                <p className="auth__text auth__text--switch">
                    Don&apos;t have an account?&nbsp;
                    <a className="auth__link auth__link--signup" href="/signup">
                        Create account
                    </a>
                </p>

                <img src={Divider} alt="divider" className="auth__divider" />

                <a className="auth__link auth__link--guest" href="/home">
                    Continue as Guest.
                </a>
            </form>
        </main>
    );
};

export default Login;
