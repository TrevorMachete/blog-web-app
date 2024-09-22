import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Import your Firebase authentication and Firestore instances
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { useUser } from '../../UserContext'; // Import UserContext
import './Login.css'; // Import styles for your custom form
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({ ...userData, uid: user.uid }); // Set user data in context with uid
      }

      navigate('/recent-posts'); // Redirect to the desired page after successful login
    } catch (err) {
      setError(err.message); // Display error message if login fails
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="signup-prompt">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
      <p className="forgot-prompt">
        Have you Forgot Password? <Link to="/forgot-password"> Click here</Link>
      </p>
    </div>
  );
};

export default LoginScreen;
