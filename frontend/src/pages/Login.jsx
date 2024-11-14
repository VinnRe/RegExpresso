import './styles/Login.css'
import Logo from '../assets/header_regex_only.svg'
import Divider from '../assets/divider_or.svg'

const Login = () => {

    return (
        <main className="loginBody">
            <img src={Logo} alt="" className="logoL" />
            <form action="" className='loginForm'>
                <h1 className="loginTitle">Welcome Back!</h1>
                <p className='loginP'>Username</p>
                <input type="text" className="loginInput usrnmLogin" />
                <p className='loginP'>Password</p>
                <input type="password" className="loginInput passLogin" />
                <button className="submitLoginBtn">Login</button>
                <p className="loginP signupSwitch">Don't have an account? <a className='signSwitchBtn' href='/signup'>Create account</a></p>
                <img src={Divider} alt="divider" className='dividerL' />
                <a className='conSwitchBtnL' href='/home'>Continue as Guest.</a>
            </form>
        </main>
    )

}

export default Login