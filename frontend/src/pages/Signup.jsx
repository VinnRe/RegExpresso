import './styles/Signup.css'
import Logo from '../assets/header_regex_only.svg'
import Acc from '../assets/ic_acc.svg'

const Signup = () => {

    return (
        <main className="signupBody">
            <img src={Logo} alt="" className="logoL" />
            <form action="" className='signupForm'>
                <h1 className="signupTitle">Get started.</h1>
                <p className='signupP'>Username</p>
                <input type="text" className="signupInput usrnmSignup" />
                <p className='signupP'>Email</p>
                <input type="email" className="signupInput emailSignup" />
                <p className='signupP'>Password</p>
                <input type="password" className="signupInput passSignup" />
                <p className='signupP'>Confirm Password</p>
                <input type="password" className="signupInput confPassSignup" />
                <button className="submitsignupBtn">Register</button>
                <p className="signupP loginSwitch">Already have an account? <a className='logSwitchBtn' href='/login'>Login!</a></p>
            </form>
        </main>
    )

}

export default Signup