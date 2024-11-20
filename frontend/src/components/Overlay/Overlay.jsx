import './Overlay.css'
import BackButton from '../../assets/ic_back.svg'

const Overlay = ({ onBack }) => {
    return (
        <section className="overlay">
            <button className="backButton" onClick={onBack}>
                Back
                <img src={BackButton} alt="back button" />
            </button>
            
            <form action="" className='changePasswordForm'>
                <h2 className="changePasswordHeading">Change password</h2>

                <label htmlFor="newPassowrd">New password</label>
                <input 
                    type="password"
                    id='newPassword' 
                    name='newPassword' 
                    className="passInput" 
                    placeholder='Enter new password here'
                    required
                />

                <label htmlFor="confirmNewPassword">Confirm new password</label>
                <input 
                    type="password"
                    id='confirmNewPassword' 
                    name='confirmNewPassword' 
                    className="passInput" 
                    placeholder='Re-enter new password here'
                    required
                />

                <button type='submit' className="saveChangesButton">Save Changes</button>
            </form>
        </section>
    )
}

export default Overlay