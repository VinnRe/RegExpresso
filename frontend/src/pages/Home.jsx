import { useState, useEffect, useCallback, useRef } from 'react';
import './styles/Home.css';
import Logo from '../assets/header_regex_only.svg';
import Overlay from '../components/Overlay/Overlay';
import Footer from '../components/Footer/Footer';
import { getUserData, useAuth } from '../context/AuthContext';
import useDotScript from '../hooks/useDotScript';
import FSMV from '../components/GraphComponent/FSMV';
import useRegexOptions from '../hooks/useRegexOptions';
import useTuples from '../hooks/useTuples';
import TuplesTable from '../components/Tuples/TuplesTable';

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
    const [tupleList, setTupleList] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 769);
    let dropdownTimeout;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 769);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        conversionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

        fetchUsername();
    }, []);

    const getAllRegex = useCallback(async () => {
        if (token) {
            try {
                const data = await fetchRegex(token);
                const regexList = data.data.automatons.map((item) => ({
                    regEx: item.regEx,
                    _id: item._id,
                }));
                setAllRegex(regexList);
            } catch (error) {
                console.error("Error fetching regex history:", error);
            }
        }
    }, [token]);

    useEffect(() => {
        getAllRegex();
    }, [getAllRegex]);

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
        scrollToConversionSection();
        try {
            let tupleGroup;
            if (type === "NFA") {
                const tuples = await getNFATuples(inputValue);
                tupleGroup = tuples.tuples;
                if (!allRegex.some((regexObj) => regexObj.regEx === inputValue)) {
                    await handleSaveRegex(inputValue);
                }
            } else if (type === "DFA") {
                const tuples = await getDFATuples(inputValue);
                tupleGroup = tuples.tuples;
                if (!allRegex.some((regexObj) => regexObj.regEx === inputValue)) {
                    await handleSaveRegex(inputValue);
                }
            } else {
                console.error("Unknown type:", type);
                return;
            }

            setTupleList(tupleGroup);
        } catch (error) {
            console.error("Error fetching tuples: ", error);
        }
    };


    const handleSaveRegex = async () => {
        try {
            if (!validateInput()) return;
            await saveRegex(inputValue, token);
            await getAllRegex();
        } catch (error) {
            console.error("Error saving regex:", error);
        }
    }

    const handleDeleteRegex = async (regexId) => {
        try {
            await deleteRegex(regexId, token);
            await getAllRegex();
        } catch (error) {
            console.error("Error deleting regex:", error);
        }
    };

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
                                        handleLogout();
                                    }}
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
                                toggleAccountDropdown();
                            }}>
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
                            <a href="" className="home__dropdown-link" onClick={(e) => {
                                e.preventDefault();
                                showOverlay();
                            }}>
                                Change password
                            </a>
                            <a className="home__dropdown-link" href=""
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
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
                    <form autoComplete='off' action="" className="home__form" onSubmit={(e) => e.preventDefault()}>
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
            {isMobile ? (
                <section className="home__conversion-section-mobile">
                    <div className="home__conversion-wrapper">
                        <div ref={conversionSectionRef} className="home__conversion-display">
                            <h2 className="home__conversion-title">Finite State Automata</h2>
                            <FSMV dotScript={dotScript} />
                        </div>

                        <form autoComplete='off' action="" className="home__form" onSubmit={(e) => e.preventDefault()}>
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
                            </div>
                        </form>
                    </div>

                    <div className="home__tuple-history-section">
                        <div className="tuple__wrapper tuple-history__wrapper">
                            <h2 className="tuple-history__title">5 Tuples</h2>
                            {tupleList ? <TuplesTable tuples={tupleList} /> : <p>No data to display yet...</p>}
                        </div>

                        {token ? (
                            <div className="history__wrapper tuple-history__wrapper">
                                <h2 className="tuple-history__title">History</h2>
                                <ul className="tuple-history__list">
                                    {allRegex.length > 0 ? (
                                        allRegex.map(({ regEx, _id }) => (
                                            <div key={_id} className="history__item-wrapper">
                                                <li
                                                    className="history__content-list"
                                                    onClick={() => handleHistoryClick(regEx)}
                                                >
                                                    {regEx}
                                                </li>
                                                <button
                                                    className="button__delete-history"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteRegex(_id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No regex found.</p>
                                    )}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </section>
            ) : (
                <section className="home__conversion-section">
                    <div className="tuple__wrapper tuple-history__wrapper">
                        <h2 className="tuple-history__title">5 Tuples</h2>
                        {tupleList ? <TuplesTable tuples={tupleList} /> : <p>No data to display yet...</p>}
                    </div>

                    <div className="home__conversion-wrapper">
                        <div ref={conversionSectionRef} className="home__conversion-display">
                            <h2 className="home__conversion-title">Finite State Automata</h2>
                            <FSMV dotScript={dotScript} />
                        </div>

                        <form autoComplete='off' action="" className="home__form" onSubmit={(e) => e.preventDefault()}>
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
                            </div>
                        </form>
                    </div>

                    <div className="home__tuple-history-section">
                        {token ? (
                            <div className="history__wrapper tuple-history__wrapper">
                                <h2 className="tuple-history__title">History</h2>
                                <ul className="tuple-history__list">
                                    {allRegex.length > 0 ? (
                                        allRegex.map(({ regEx, _id }) => (
                                            <div key={_id} className="history__item-wrapper">
                                                <li
                                                    className="history__content-list"
                                                    onClick={() => handleHistoryClick(regEx)}
                                                >
                                                    {regEx}
                                                </li>
                                                <button
                                                    className="button__delete-history"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteRegex(_id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No regex found.</p>
                                    )}
                                </ul>
                            </div>
                        ) : (
                            <div className="history__wrapper tuple-history__wrapper--null"></div>
                        )}
                    </div>
                </section>
            )}

            {overlayVisible && (
                <Overlay onCancel={hideOverlay} />
            )}

            <Footer />
        </div>
    );
};

export default Home;
