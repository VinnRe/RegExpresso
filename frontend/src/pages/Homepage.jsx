import './styles/Homepage.css'
import Logo from '../assets/header_regex_only.svg'

const Homepage = () => {
    return (
        <body className="homepageBody">
            <header className="homepageHeader">
                <img src={Logo} alt="" className="logoH" />
            </header>
        </body>
    )
}

export default Homepage