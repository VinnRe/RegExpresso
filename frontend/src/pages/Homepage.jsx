import './styles/Homepage.css'
import Logo from '../assets/header_reg_expresso.svg'
import Header from '../assets/header_regex_only.svg'

const Homepage = () => {
    const scrollToMainPage = () => document.querySelector('.homeMainPage')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <body className="homepageBody">
            <section className="homeLandingPage containerPage">
                <header className='mainLogo'>
                    <img src={Logo} alt="RegExpersso" />                  
                </header>
                <button className='buttonStart' onClick={scrollToMainPage}>Start Converting</button>
            </section>

            <main className='homeMainPage containerPage'>
                <header>
                    <img src={Header} alt="RegExpersso" />                  
                </header>
            </main>
        </body>
    )
}

export default Homepage