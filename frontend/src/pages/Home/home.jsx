import '../Home/home.css';
import Logo from '../../assets/header_regex_only.svg';

const Home = () => {
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
            </header>

            <main className="home__main">
                <div className="home__main-header">
                    <h1 className="home__main-title">From RegEx to Automata,<br></br>Simplified</h1>
                    <p className="home__main-subtitle">Fast. Accurate. Effortless.</p>
                </div>

                <div className="home__main-content">
                    <p className="home__main-description">Transform complex regular expressions into clear, visual finite automata.</p>
                    <form action="" className="home__form">
                        <input className="home__form-input" type="text" placeholder="Enter regular expression" aria-label='input' />
                        <button className="home__form-button">Convert</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Home;
