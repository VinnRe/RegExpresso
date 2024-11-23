import './Overlay.css'
import PropTypes from 'prop-types'; 

const Overlay = ({onCancel}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section className="overlay__section">
            <form action="" className='overlay__form' onSubmit={handleSubmit}>
                <h2 className="overlay__form-title">Change Password</h2>

                <div className='form-input__wrapper'>
                    <label htmlFor="newPassword">New password</label>
                    <input 
                        type="password"
                        id='newPassword' 
                        name='newPassword' 
                        className="overlay__form-input" 
                        placeholder='Enter new password here'
                        required
                    />
                </div>

                <div className='form-input__wrapper'>
                    <label htmlFor="confirmNewPassword">Confirm new password</label>
                    <input 
                        type="password"
                        id='confirmNewPassword' 
                        name='confirmNewPassword' 
                        className="overlay__form-input" 
                        placeholder='Re-enter new password here'
                        required
                    />
                </div>
                <button className="overlay__form-button">Save Changes</button>
                
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCancel(); }} 
                        type='button' 
                        className="overlay__back-button">
                Cancel
                </button>
            </form>
        </section>
    );
};

Overlay.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default Overlay