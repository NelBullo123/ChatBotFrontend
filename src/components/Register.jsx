import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css'; // Assuming you have a CSS file for styling
import chatbotLogo from './assets/chatbotlogo.png'; // Replace with your logo

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email format');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                mode: 'cors'  // Explicitly setting mode to 'cors'
            });
            

            if (response.ok) {
                alert('Registration successful');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                navigate('/login');  
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Registration failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleRegister} className={styles.form}>
                <img src={chatbotLogo} alt="Chatbot Logo" className={styles.logo} />
                <h2>Register</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={styles.input}
                />
                <button type="submit" disabled={loading} className={styles.button}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <p className={styles.toggleText}>
                    Already have an account? <Link to="/login">Login now</Link>
                </p>
            </form>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    );
}

export default Register;
