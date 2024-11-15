import React from 'react'; 
import ProductList from './ProductList';
import UserList from './UserList';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import './App.css';  // Importing the CSS file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ensure BrowserRouter is imported


function App() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login status
    const isRegistered = localStorage.getItem('user') !== null; // Check if the user is registered

    console.log('isLoggedIn:', isLoggedIn);  // Debugging: log the value of isLoggedIn
    console.log('isRegistered:', isRegistered);  // Debugging: log the value of isRegistered
    const handleLogout = () => {
      // Clear the login status
      localStorage.removeItem('isLoggedIn');
      // Redirect the user to the login page (optional)
      window.location.reload();  // This will reload the page and reset the state
  };

    

    return (       
       <div className="App">
            <h1>Welcome to Wings Cafe</h1>
            <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
            {/* Show Register page if the user is not registered */}
            {!isRegistered ? (
                <div>
                    <h2>Please Register</h2>
                    <Register /> {/* Show Register form */}
                </div>
            ) : (
                // If the user is registered, check if they are logged in
                isLoggedIn ? (
                    <>
                        <Dashboard /> {/* Show Dashboard if logged in */}


                    </>
                ) : (
                    <div>
                        <h2>Please Log in</h2>
                        <Login /> {/* Show Login form */}
                    </div>
                )
            )}
        </div>
    ); 
}
export default App;