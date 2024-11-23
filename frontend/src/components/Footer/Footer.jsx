import './Footer.css'
import GithubLogo from '../../assets/github.svg'
import RegExLogo from '../../assets/header_regex_only.svg'

const Footer = () => {
    return (
        <footer className="footer__body">
            <section className="footer__contact-links">
                <ul className="footer__social">
                    <li><a href="https://github.com/mothy-08"><img src={GithubLogo} alt="githubLink" /> <p>Timothy Alimagno</p></a></li>
                    <li><a href="https://github.com/VinnRe"><img src={GithubLogo} alt="githubLink" /><p>Kobe Capinpin</p></a></li>
                    <li><a href="https://github.com/Exuille"><img src={GithubLogo} alt="githubLink" /><p>Alexander Penuliar</p></a></li>
                </ul>
            </section>
            <section className="footer__bottom">
                <img src={RegExLogo} alt="RegExprssoLogo" className="footer__logo" />
                <p className="footer_arr">Copyright © 2024 TripleThreat</p>
            </section>
        </footer>
    )
}

export default Footer