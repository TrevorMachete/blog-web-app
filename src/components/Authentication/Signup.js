import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Import your Firebase authentication and Firestore instances
import './Login.css'; // Import styles for your custom form
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the sign-up function
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore'; // Import Firestore functions
import './Signup.css';

const SignupScreen = () => {
    // Create user with username, email and password
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sign up the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create a document in the 'users' collection with the user's email and username
            await setDoc(doc(collection(db, 'users'), user.uid), {
                username: username,
                email: email,
                uid: user.uid,
            });

            // After signing up, check if the user has any posts in the database
            const postsRef = collection(db, 'blogs');
            const q = query(postsRef, where('authorId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                // If no posts exist, navigate to an empty Recent Posts page
                navigate('/create-post'); 
            } else {
                // If posts exist, navigate to Recent Posts with content
                navigate('/recent-posts'); // Adjust the route as needed if you want different handling
            }

        } catch (err) {
            setError(err.message); // Display error message if login fails
        }
    };

    return (
        <div className="sign-container">
            <h2 className="sign-header">Sign up</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Sign Up</button>
            </form>
            <p className="signup-prompt">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default SignupScreen;
