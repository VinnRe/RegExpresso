import './styles/Homepage.css'
import ConvertIcon from '../assets/ic_convert.svg'
import AccountIcon from '../assets/ic_acc.svg'
import FSAHeader from '../assets/header_fsa.svg'
import SaveIcon from '../assets/ic_save.svg'

const Homepage = () => {
    return (
        <div className="homepageBody">
            <header className="mainHeader">
                <form className='regexForm' action="" method='POST'>
                    <input type='text' name='regularExpression' placeholder='Enter regular expression here' aria-label='RegEx Input' />
                    <button type='submit' className='convertIcon'>
                        <img src={ConvertIcon} alt="convert icon" />
                    </button>
                </form>
                
                <button className="previousConversionButton">
                    <a href="#previousConversions">Previous Conversions</a>
                </button>
                
                <button className='accountIcon'>
                    <img src={AccountIcon} alt="account icon" />
                </button>
            </header>

            <main className='homeMainPage'>
                <img className='headerFSA' src={FSAHeader} alt="finite state automata header" />
                <div className="displayFSA"></div>
                <button className='saveButton'>
                    Save automata
                    <img src={SaveIcon} alt="save icon" />
                </button>
            </main>
        </div>
    )
}

export default Homepage