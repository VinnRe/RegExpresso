import React, { useState } from 'react';
import './styles/Homepage.css';
import LogoHeader from '../assets/ic_logo_regexpresso.svg';
import ConvertIcon from '../assets/ic_convert.svg';
import AccountIcon from '../assets/ic_acc.svg';
import FSAHeader from '../assets/header_fsa.svg';
import SaveIcon from '../assets/ic_save.svg';
import Overlay from '../components/Overlay/Overlay';

const Homepage = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const showOverlay = () => {
        setIsDropdownVisible(false); 
        setIsOverlayVisible(true); 
    };

    const hideOverlay = () => {
        setIsOverlayVisible(false); 
    };

    return (
        <div className="homepageBody">
            <header className="mainHeader">
                <img src={LogoHeader} alt="regexpresso header" className="mainHeaderLogo" />
                
                <form className='regexForm' action="" method='POST'>
                    <input type='text' name='regularExpression' placeholder='Enter regular expression here' aria-label='RegEx Input' />
                    <button type='submit' className='convertIcon'>
                        <img src={ConvertIcon} alt="convert icon" />
                    </button>
                </form>
                
                <button className="previousConversionButton">
                    <a href="#previousConversions">Previous Conversions</a>
                </button>
                
                 <div className="accountDropdown">
                    <button className='accountIcon' onClick={toggleDropdown}>
                        <img src={AccountIcon} alt="account icon" />
                    </button>
                    {isDropdownVisible && (
                        <ul className="dropdownMenu">
                            <li className="dropdownItem">@your_username</li>
                            <li className="dropdownItem" onClick={showOverlay}>Edit password</li>
                            <li className="dropdownItem">Logout</li>
                        </ul>
                    )}
                </div>
            </header>

            <main className='homeMainPage'>
                <img className='headerFSA' src={FSAHeader} alt="finite state automata header" />
                <div className="displayFSA"></div>
                <button className='saveButton'>
                    Save automata
                    <img src={SaveIcon} alt="save icon" />
                </button>
            </main>

            {isOverlayVisible && <Overlay onBack={hideOverlay}/>}
        </div>
    )
}

export default Homepage