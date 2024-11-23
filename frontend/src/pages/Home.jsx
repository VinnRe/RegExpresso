import { useState, useEffect, useCallback } from 'react';
import './styles/Home.css';
import Logo from '../assets/header_regex_only.svg';
import Overlay from '../components/Overlay/Overlay';
import Footer from '../components/Footer/Footer';

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [overlayVisible, setOverlayVisible] = useState(false); 
    let dropdownTimeout;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleAccountDropdown = () => setAccountDropdownOpen(!accountDropdownOpen);

    const showDropdown = () => {
        clearTimeout(dropdownTimeout);
        setDropdownVisible(true);
    };

    const hideDropdown = () => {
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(() => {
            setDropdownVisible(false);
        }, 200);
    };

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

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.home__header');
            if (window.scrollY > 0) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const showOverlay = useCallback(() => {
        setOverlayVisible(true);

        setTimeout(() => {
            document.querySelector('.overlay__section').classList.add('visible');
        }, 0); 
    }, []);

    const hideOverlay = () => {
        const overlay = document.querySelector('.overlay__section');
        
        overlay.classList.add('hidden');
        
        setTimeout(() => {
            setOverlayVisible(false);
            overlay.classList.remove('visible', 'hidden'); 
        }, 300);
    };

    useEffect(() => {
        const result = fetch('')
    })


    return (
        <div className="home__body">
            <header className="home__header">
                <div className="home__logo-wrapper">
                    <img className="home__logo" src={Logo} alt="RegExpresso Logo" />
                </div>

                <nav className="home__nav">
                    <ul className="home__nav-list">
                        <li className="home__nav-item">
                            <a className="home__nav-link" href="/about">About us</a>
                        </li>
                    </ul>
                </nav>

                <div className="account-wrapper" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                    <span className="material-symbols-outlined account-wrapper__icon">account_circle</span>

                    {dropdownVisible && (
                        <div className="account__dropdown">
                            <p className="account__dropdown-username">@your_username</p>
                            <a className="account__dropdown-link" href="" onClick={(e) => {
                                e.preventDefault();
                                showOverlay();
                            }}>Change password</a>
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

                <div className={`home__dropdown ${menuOpen ? 'active' : ''}`}>
                    <button
                        className="home__dropdown-close"
                        onClick={toggleMenu}
                        aria-label="Close Navigation Menu"
                    >
                        ✕
                    </button>
                    <a className="home__dropdown-link" href="" 
                        onClick={(e) => {
                            e.preventDefault(); 
                            toggleAccountDropdown();}}>
                        Account
                    </a>
                    <a className="home__dropdown-link" href="/about">About us</a>

                    {accountDropdownOpen && (
                        <div className="home__account-dropdown">
                            <button
                                className="home__dropdown-close"
                                onClick={toggleAccountDropdown}
                                aria-label="Close Navigation Menu"
                            >
                                Back
                            </button>
                            <a href="" className="home__dropdown-link">@your_username</a>
                            <a href="" className="home__dropdown-link"onClick={(e) => {
                                e.preventDefault(); 
                                showOverlay();}}>
                                Change password
                            </a>
                            <a href="" className="home__dropdown-link">Logout</a>
                        </div>
                    )}
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
                                id="regex-input-1"
                                className="home__form-input" 
                                type="text" 
                                placeholder=" " 
                                value={inputValue}
                                onChange={handleInputChange}
                                required 
                            />
                            <label htmlFor="regex-input-1" className="home__form-label--floating">
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
                    
                    <form action="" className="home__form">
                        <div className="home__input-container">
                            <input 
                                id="regex-input-2"
                                className="home__form-input" 
                                type="text" 
                                placeholder=" "
                                value={inputValue}
                                onChange={handleInputChange} 
                                required 
                            />
                            <label htmlFor="regex-input-2" className="home__form-label--floating">
                                Enter regular expression
                            </label>
                        </div>
                        <button className="home__form-button">Convert</button>
                    </form>
                </div>

                <div className="home__conversion-wrapper">
                    <h2 className="home__conversion-title">5 Tuples</h2>
                    <div className="home__conversion-display home__conversion-tuples"></div>
                </div>

                <div className="home__conversion-wrapper">
                    <h2 className="home__conversion-title">Your Previous Conversions</h2>
                    <div className="home__conversion-display"></div>
                </div>
            </section>

            {overlayVisible && (
                <Overlay onCancel={hideOverlay} />
            )}
            
            <Footer />
        </div>
    );
};

export default Home;
