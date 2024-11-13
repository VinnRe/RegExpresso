import './styles/Homepage.css'
import Logo from '../assets/header_regex_only.svg'

const Homepage = () => {
    return (
        <main className="homepage">
            <header className="homepageHeader">
                <img src={Logo} alt="" className="logoH" />
            </header>
        </main>
    )
}

export default Homepage