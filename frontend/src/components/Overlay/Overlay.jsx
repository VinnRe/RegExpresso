import { useState } from 'react';
import './Overlay.css';
import PropTypes from 'prop-types';
import { endpoints } from '../../config/config';

const Overlay = ({ onCancel }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (newPassword !== confirmNewPassword) {
                setErrorMessage('Passwords do not match.');
                return;
            }

            if (newPassword.length < 8) {
                setErrorMessage('Passwords must more than 8 characters long.');
                return;
            }

            setErrorMessage('');
            console.log('Password change submitted:', newPassword);

            const response = await fetch(endpoints.updatePassword, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: newPassword
                })
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

        } catch (error) {
            console.error("Error: ", error)
            throw error
        }


    };

    return (
        <section className="overlay__section">
            <form action="" className="overlay__form" onSubmit={handleSubmit}>
                <h2 className="overlay__form-title">Change Password</h2>

                <div className="form-input__wrapper">
                    <label htmlFor="newPassword">New password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="overlay__form-input"
                        placeholder="Enter new password here"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-input__wrapper">
                    <label htmlFor="confirmNewPassword">Confirm new password</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        className="overlay__form-input"
                        placeholder="Re-enter new password here"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button className="overlay__form-button">Save Changes</button>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onCancel();
                    }}
                    type="button"
                    className="overlay__back-button"
                >
                    Cancel
                </button>
            </form>
        </section>
    );
};

Overlay.propTypes = {
    onCancel: PropTypes.func.isRequired,
};

export default Overlay;
