import React, { useState } from 'react';
import { auth } from '../../firebase'; // Firebase authentication instance
import { sendPasswordResetEmail } from 'firebase/auth'; // Firebase function for sending reset email
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Add styles
import { Link } from 'react-router-dom';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Check your inbox.');
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div className="forgot-password-container">
            <h2 className="forgot-password-header">Reset Password</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Enter your email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            <p className="login-redirect">
                Remembered your password? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};
export default ForgotPasswordScreen;