
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [existingUsers, setExistingUsers] = useState(
        JSON.parse(localStorage.getItem("user")) || []
    );

    useEffect(() => {
        // Fetch users from the backend on component mount
        axios
            .get('http://localhost:3000/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const handleAddUser = (event) => {
        event.preventDefault();
    
        // Check if username and password are not empty
        if (!username || !password) {
            alert('Username and password are required');
            return;
        }
    
        const newUser = { username, password };
    
        // Send the new user data to the backend API
        axios
            .post('http://localhost:3000/users', newUser)
            .then((response) => {
                const addedUser = response.data; // Backend returns the newly added user
    
                // Update local state and localStorage
                const updatedUsers = [...existingUsers, addedUser];
                setExistingUsers(updatedUsers);
                localStorage.setItem("user", JSON.stringify(updatedUsers));
    
                // Also update users from the backend
                setUsers([...users, addedUser]);
    
                // Reset input fields
                setUsername('');
                setPassword('');
            })
            .catch((error) => {
                console.error('Error adding user:', error);
                alert('Error adding user!');  // Alert to the user
            });
    };
    
    const handleDeleteUser = (usernameToDelete) => {
        // Delete user locally
        const updatedUsers = existingUsers.filter(user => user.username !== usernameToDelete);
        localStorage.setItem("user", JSON.stringify(updatedUsers));
        setExistingUsers(updatedUsers);

        // Optional: Add API call to delete the user from the server
        axios
            .delete(`http://localhost:3000/users/${usernameToDelete}`)
            .then(() => {
                // Remove user from the server list
                setUsers(users.filter(user => user.username !== usernameToDelete));
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
                // Revert local state if DELETE fails
                setExistingUsers(updatedUsers);
            });
    };

    return (
        <section>
            <h2>User Management</h2>
            <form className="vertical-form" onSubmit={handleAddUser}>
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
                <button type="submit">Add User</button>
            </form>
            <h3>Existing Users (LocalStorage)</h3>
            <ul>
                {existingUsers.length > 0 ? (
                    existingUsers.map((user, index) => (
                        <li key={index}>
                            {user.username}
                            <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No users registered yet.</li>
                )}
            </ul>
            <h2>All Users (Server)</h2>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}> {/* Ensure 'user.id' exists in the response */}
                            {user.username}
                        </li>
                    ))
                ) : (
                    <li>No users found on the server.</li>
                )}
            </ul>
        </section>
    );
}

export default UserList;
