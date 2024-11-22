import { useState, useEffect } from 'react';
import './styles/Home.css';
import Logo from '../assets/header_regex_only.svg';
import Footer from '../components/Footer/Footer'

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600 && menuOpen) {
                setMenuOpen(false); 
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize); 
        };
    }, [menuOpen]);

    return (
        <div className="home__body">
            <header className="home__header">
                <div className="home__logo-wrapper">
                    <img className="home__logo" src={Logo} alt="RegExpresso Logo" />
                </div>


                <nav className="home__nav">
                    <ul className="home__nav-list">
                        <li className="home__nav-item">
                            <a className="home__nav-link" href="">Home</a>
                        </li>
                        <li className="home__nav-item">
                            <a className="home__nav-link" href="">About us</a>
                        </li>
                    </ul>
                </nav>

                <button className="account-button">
                    <span className="material-symbols-outlined account-button__icon">account_circle</span>
                </button>

                <span 
                    className="material-symbols-outlined home__menu-icon"
                    onClick={toggleMenu}
                    aria-label="Toggle Navigation Menu"
                >
                    menu
                </span>

                <div className={`home__dropdown ${menuOpen ?'active' : ''}`}>
                <button
                        className="home__dropdown-close"
                        onClick={toggleMenu}
                        aria-label="Close Navigation Menu"
                    >
                        ✕
                    </button>
                    <a className="home__dropdown-link" href="">Account</a>
                    <a className="home__dropdown-link" href="">Home</a>
                    <a className="home__dropdown-link" href="">About us</a>
                </div>
            </header>

            <main className="home__main">
                <div className="home__main-header">
                    <h1 className="home__main-title">From RegEx to Automata,<br></br>Simplified</h1>
                    <p className="home__main-subtitle">Fast. Accurate. Effortless.</p>
                </div>

                <div className="home__main-content">
                    <p className="home__main-description">Transform complex regular expressions into clear, visual finite automata.</p>
                    <form action="" className="home__form">
                        <div className="home__input-container">
                            <input 
                                id="regex-input"
                                className="home__form-input" 
                                type="text" 
                                placeholder=" " 
                                aria-label='input'
                                required 
                            />
                            <label htmlFor="regex-input" className="home__form-label--floating">
                                Enter regular expression
                            </label>
                        </div>
                        <button className="home__form-button">Convert</button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
