import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import chatbotLogo from './assets/chatbotlogo.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://chatbotbackend-co2p.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('access_token', data.token); // Save token for future requests
                alert('Login successful');
                navigate('/chatbot'); // Redirect to the chatbot after successful login
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert('An error occurred during login. Please try again.');
        }
    };
    

    return (
        <div className={styles.container}>
            <form onSubmit={handleLogin} className={styles.form}>
                <img src={chatbotLogo} alt="Chatbot Logo" className={styles.logo} />

                <h2>Login</h2>
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
                <button type="submit" className={styles.button}>Login</button>

                <p className={styles.toggleText}>
                    Don't have an account? <Link to="/register">Register now</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
