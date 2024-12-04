import './styles/About.css'
import RegExpLogo from '../assets/header_regex_only.svg'
import BackButton from '../assets/button_back.svg'
import GithubLogo from '../assets/github.svg'

const About = () => {
    return (
        <main className="about__body">
            <section className="about__body--left">
            </section>
            <section className="about__body--right">
                <a href="/home" className="home__button"><img src={RegExpLogo} alt="" className='abt__logo' /> <img src={BackButton} alt="home_button" className='home__btn' /></a>
                <h1>About Us</h1>
                <p>RegExpresso is a web application that converts Regular Expressions to Finite State Machines.
                    TripleThreat created this web application for users to visualize their regular expressions in a simple
                    and easy to use interface.
                </p>
                <section className="about__contact-links">
                    <ul className="about__social">
                        <li><a href="https://github.com/mothy-08"><img src={GithubLogo} alt="githubLink" /> <p>Timothy Alimagno</p></a></li>
                        <li><a href="https://github.com/VinnRe"><img src={GithubLogo} alt="githubLink" /><p>Kobe Capinpin</p></a></li>
                        <li><a href="https://github.com/Exuille"><img src={GithubLogo} alt="githubLink" /><p>Alexander Penuliar</p></a></li>
                    </ul>
                </section>
                <p className="footer_arr"><br />Copyright © 2024 TripleThreat</p>
            </section>
        </main>
    )
}

export default About