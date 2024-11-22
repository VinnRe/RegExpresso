import { useState, useEffect } from 'react';
import './styles/Home.css';
import Logo from '../assets/header_regex_only.svg';
import Footer from '../components/Footer/Footer'

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    let dropdownTimeout;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const showDropdown = () => {
        clearTimeout(dropdownTimeout);
        setDropdownVisible(true);
    }

    const hideDropdown = () => {
        dropdownTimeout = setTimeout(() => {
            setDropdownVisible(false);
        }, 200)
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
            clearTimeout(dropdownTimeout);
        };
    }, [dropdownTimeout, menuOpen]);

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

                <div className="account-wrapper" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                    <span className="material-symbols-outlined account-wrapper__icon">account_circle</span>

                    {dropdownVisible && (
                        <div className="account__dropdown">
                            <p className="account__dropdown-username">@your_username</p>
                            <a className="account__dropdown-link" href="">Edit Password</a>
                            <a className="account__dropdown-link" href="">Logout</a>
                        </div>
                    )}
                </div>


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

                <section className="home__conversion-section">
                    <div className="home__conversion-wrapper">
                        <h2 className="home__conversion-title">Finite State Automata Diagram</h2>
                    <div className="home__conversion-display"></div>
                </div>

                <div className="home__conversion-wrapper">
                    <h2 className="home__conversion-title">Your Previous Conversions</h2>
                    <div className="home__conversion-display"></div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
