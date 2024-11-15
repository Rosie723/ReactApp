import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Hook for navigation

    const handleLogin = (e) => {
        e.preventDefault();
        
        const storedUser = JSON.parse(localStorage.getItem('user')); // Get user from localStorage
        
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            // User is authenticated
            localStorage.setItem('isLoggedIn', 'true');
            alert('Login successful!');
            navigate('/dashboard');  // Navigate to the Dashboard
        } else {
            setError('Invalid credentials');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');  // Redirect to Register page
        
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && (
                <div>
                    <p>{error}</p>
                    <button onClick={handleRegisterRedirect}>Go to Register</button> {/* Redirect to Register page */}
                </div>
            )}
            
        </div>
    );
};

export default Login;
