import './styles/Login.css'

const Login = () => {

    return (
        <main className="loginBody">
            <h1 className='logoNameL'>RegExpresso</h1>
            <form action="" className='loginForm'>
                <h1 className="loginTitle">Login</h1>
                <p className='loginP'>Username</p>
                <input type="text" className="loginInput usrnmLogin" />
                <p className='loginP'>Password</p>
                <input type="password" className="loginInput passLogin" />
            </form>
            <p className="loginP signupSwitch">Don't have an account? <a className='signSwitchBtn' href='/signup'>Sign Up!</a></p>
        </main>
    )

}

export default Login