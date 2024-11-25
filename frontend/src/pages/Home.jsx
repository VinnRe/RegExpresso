import { useState, useEffect, useCallback, useRef } from 'react';
import './styles/Home.css';
import Logo from '../assets/header_regex_only.svg';
import Overlay from '../components/Overlay/Overlay';
import Footer from '../components/Footer/Footer';
import { endpoints } from '../config/config';
import { getUserData, useAuth } from '../context/AuthContext';
import useDotScript from '../hooks/useDotScript';
import FSMV from '../components/GraphComponent/FSMV';
import useRegexOptions from '../hooks/useRegexOptions';
import useTuples from '../hooks/useTuples';
import TupleTable from '../components/Tuples/Tuples';

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [hasError, setHasError] = useState(false);
    const conversionSectionRef = useRef(null);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [username, setUsername] = useState('');
    const { handleLogout } = useAuth();
    const token = localStorage.getItem('token')
    const { dotScript, fetchDotScript, loading, error } = useDotScript();
    const { fetchRegex, saveRegex, deleteRegex } = useRegexOptions();
    const [allRegex, setAllRegex] = useState([]);
    const { getDFATuples, getNFATuples } = useTuples();
    const [tupleList, setTupleList] = useState([]);
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
        if (e.target.value.trim() !== '') setHasError(false);
    };

    const scrollToConversionSection = () => {
        conversionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center'});
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
        const fetchUsername = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const fetchedUsername = await getUserData(token);
                if (fetchedUsername) {
                    setUsername(fetchedUsername);
                } else {
                    setUsername('Unknown Username');
                }
            } else {
                setUsername('');
            }
        };

        const getAllRegex = async () => {
            const data = await fetchRegex(token);
            const regexList = data.data.automatons.map((item) => ({
                regEx: item.regEx,
                _id: item._id,
            }));
            setAllRegex(regexList)
            console.log(regexList)
        }

        getAllRegex();
        fetchUsername();
    }, []);

    const validateInput = () => {
        if (!inputValue.trim()) {
            setHasError(true);
            return false;
        }
        return true;
    }

    const handleVisualize = async (type) => {
        if (!validateInput()) return;
        fetchDotScript(inputValue, type);
    
        try {
            let tupleGroup = [];
            if (type === "NFA") {
                const tuples = await getNFATuples(inputValue);
                tupleGroup = [tuples.tuples];
            } else if (type === "DFA") {
                const tuples = await getDFATuples(inputValue);
                tupleGroup = [tuples.tuples];
            } else {
                console.error("Unknown type:", type);
                return;
            }
    
            console.log("TUPLE GROUP: ", tupleGroup);
            setTupleList(tupleGroup);

            scrollToConversionSection();
        } catch (error) {
            console.error("Error fetching tuples: ", error);
        }
    };
    

    const handleSaveRegex = () => {
        if (!validateInput()) return;
        saveRegex(inputValue, token);
        console.log("REGEX SAVED: ", inputValue)
    }

    const handleDeleteRegex = (regexId) => {
        deleteRegex(regexId, token)
        // ADD INDICATOR THAT REGEX IS DELTED
    }

    const handleHistoryClick = (regexValue) => {
        setInputValue(regexValue);
        scrollToConversionSection();
    }

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

                {!token ? (
                    <a href="/login" className="home__nav-link home__nav-login">Login</a>
                ) : (
                    <div className="account-wrapper" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                        <span className="material-symbols-outlined account-wrapper__icon">account_circle</span>

                        {dropdownVisible && (
                            <div className="account__dropdown">
                                <p className="account__dropdown-username">{username}</p>
                                <a className="account__dropdown-link" href="" onClick={(e) => {
                                    e.preventDefault();
                                    showOverlay();
                                }}>Change password</a>
                                <a className="account__dropdown-link" href="" 
                                    onClick={(e) => {
                                        e.preventDefault(); 
                                        handleLogout();}}
                                >Logout</a>
                            </div>
                        )}
                    </div>
                )}

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
                    {token ? (
                        <a className="home__dropdown-link" href="" 
                            onClick={(e) => {
                                e.preventDefault(); 
                                toggleAccountDropdown();}}>
                            Account
                        </a>
                    ) : (
                        <a className="home__dropdown-link" href="/login">Login</a>
                    )}
                    
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
                            <a href="" className="home__dropdown-link">{username}</a>
                            <a href="" className="home__dropdown-link"onClick={(e) => {
                                e.preventDefault(); 
                                showOverlay();}}>
                                Change password
                            </a>
                            <a className="home__dropdown-link" href="" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogout();}}
                                >Logout</a>
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
                    <form action="" className="home__form" onSubmit={(e) => e.preventDefault()}>
                        <div className={`home__input-container ${hasError ? 'input-error' : ''}`} >
                            <input 
                                id="regex-input-1"
                                className="home__form-input" 
                                type="text" 
                                placeholder=" " 
                                value={inputValue}
                                onChange={handleInputChange}
                                required 
                            />
                            <label htmlFor="regex-input-1" className={`home__form-label--floating ${hasError ? 'label-error' : ''}`}>
                                Enter regular expression
                            </label>
                        </div>
                        <div className="form__button-wrapper">
                            <button className="home__form-button" onClick={() => handleVisualize('NFA')}>Convert NFA</button>
                            <button className="home__form-button" onClick={() => handleVisualize('DFA')}>Convert DFA</button>
                        </div>
                    </form>
                </div>
            </main>

            <section className="home__conversion-section">
                <div className="home__conversion-wrapper">
                    <h2  className="home__conversion-title">Finite State Automata Diagram</h2>
                    <div ref={conversionSectionRef} className="home__conversion-display">
                        <FSMV dotScript={dotScript} />
                    </div>
                    
                    <form  action="" className="home__form" onSubmit={(e) => e.preventDefault()}>
                        <div className={`home__input-container ${hasError ? 'input-error' : ''}`}>
                            <input
                                id="regex-input-2"
                                className="home__form-input" 
                                type="text" 
                                placeholder=" "
                                value={inputValue}
                                onChange={handleInputChange} 
                                required 
                            />
                            <label htmlFor="regex-input-2" className={`home__form-label--floating ${hasError ? 'label-error' : ''}`}>
                                Enter regular expression
                            </label>
                        </div>
                        <div className="form__button-wrapper">
                            <button className="home__form-button" onClick={() => handleVisualize('NFA')}>Convert NFA</button>
                            <button className="home__form-button" onClick={() => handleVisualize('DFA')}>Convert DFA</button>
                            <button className="home__form-button" onClick={() => handleSaveRegex()}>Save Regex</button>
                        </div>
                    </form>
                </div>

                <div className="home__conversion-wrapper">
                    <h2 className="home__conversion-title">5 Tuples</h2>
                    <div className="home__conversion-display home__conversion-tuples">
                        <TupleTable tuples={tupleList} />
                    </div>
                </div>

                <div className="home__conversion-wrapper">
                    <h2 className="home__conversion-title">Your Previous Conversions</h2>
                    <div className="home__conversion-display">
                        <ul className='home__conversion-histrory-list'>
                            {allRegex.length > 0 ? (
                                allRegex.map(({ regEx, _id }) => (
                                    <li 
                                        key={_id} 
                                        onClick={() => handleHistoryClick(regEx)} 
                                        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                        className='home__conversion-history-regex'
                                    >
                                        {regEx}
                                        <button className="delete__button-regex" onClick={() => handleDeleteRegex(_id)}>X</button>
                                    </li>
                                ))
                            ) : (
                                <p>No regex found.</p>
                            )}
                        </ul>
                    </div>
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
