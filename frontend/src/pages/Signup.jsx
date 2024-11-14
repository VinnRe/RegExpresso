import './styles/Signup.css'
import Logo from '../assets/header_regex_only.svg'
import Divider from '../assets/divider_or.svg'

const Signup = () => {

    return (
        <main className="signupBody">
            <img src={Logo} alt="" className="logoS" />
            <form action="" className='signupForm'>
                <h1 className="signupTitle">Get started.</h1>
                <p className='signupP'>Username</p>
                <input type="text" className="signupInput usrnmSignup" />
                <p className='signupP'>Email</p>
                <input type="email" className="signupInput emailSignup" />
                <p className='signupP'>Password</p>
                <input type="password" className="signupInput passSignup" />
                <p className='signupP'>Re-enter Password</p>
                <input type="password" className="signupInput confPassSignup" />
                <button className="submitsignupBtn">Create account</button>
                <p className="signupP loginSwitch">Already have an account? <a className='logSwitchBtn' href='/login'>Login</a></p>
                <img src={Divider} alt="divider" className='dividerS' />
                <a className='conSwitchBtnS' href='/home'>Continue as Guest.</a>
            </form>
        </main>
    )

}

export default Signup