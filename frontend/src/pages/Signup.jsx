import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles/AuthForm.css';
import Logo from '../assets/header_regex_only.svg';
import Divider from '../assets/divider_or.svg';

const Signup = () => {
    const { handleSignup } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
        } else {
            setPasswordError('');
        }

        if (confirmPassword && password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent submission if there are validation errors
        if (emailError || passwordError || confirmPasswordError) return;

        try {
            const isSuccess = await handleSignup(username, email, password);
            if (isSuccess) {
                navigate('/home');
            } else {
                console.error('Signup failed. Please check all the fields.');
            }
        } catch (error) {
            console.error('An error occurred. Please try again later.', error);
        }
    };

    return (
        <main className="auth auth--signup">
            <img src={Logo} alt="RegExpresso Logo" className="auth__logo" />
            <form autoComplete="off" className="auth__form" onSubmit={handleSubmit}>
                <h1 className="auth__title auth__signup-title">Get started.</h1>

                <div className="auth__field">
                    <input
                        id="input-username"
                        type="text"
                        className="auth__input auth__input--username"
                        value={username}
                        placeholder=" "
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="input-username" className="auth__label">Username</label>
                </div>

                <div className={`auth__field ${emailError ? 'auth__field--error' : ''}`}>
                    <input
                        id="input-email"
                        type="email"
                        className="auth__input auth__input--email"
                        value={email}
                        placeholder=" "
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="input-email"
                        className={`auth__label ${emailError ? 'auth__label--error' : ''}`}
                    >
                        {emailError || 'Email address'}
                    </label>
                </div>

                <div className={`auth__field ${passwordError ? 'auth__field--error' : ''}`}>
                    <input
                        id="input-password"
                        type={showPassword ? 'text' : 'password'}
                        className="auth__input auth__input--password"
                        value={password}
                        placeholder=" "
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="input-password"
                        className={`auth__label ${passwordError ? 'auth__label--error' : ''}`}
                    >
                        {passwordError || 'Password'}
                    </label>
                    <span
                        className="material-symbols-outlined auth__toggle-password"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                </div>

                <div className={`auth__field ${confirmPasswordError ? 'auth__field--error' : ''}`}>
                    <input
                        id="input-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="auth__input auth__input--password"
                        value={confirmPassword}
                        placeholder=" "
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            validateConfirmPassword(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="input-confirm-password"
                        className={`auth__label ${confirmPasswordError ? 'auth__label--error' : ''}`}
                    >
                        {confirmPasswordError || 'Re-enter password'}
                    </label>
                    <span
                        className="material-symbols-outlined auth__toggle-password"
                        onClick={toggleConfirmPasswordVisibility}
                    >
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                    </span>
                </div>

                <button
                    className="auth__button auth__button--submit"
                    disabled={!!emailError || !!passwordError || !!confirmPasswordError}
                >
                    Create Account
                </button>
                <p className="auth__text auth__text--switch">
                    Already have an account?&nbsp;
                    <a className="auth__link auth__link--login" href="/login">
                        Login
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

export default Signup;
