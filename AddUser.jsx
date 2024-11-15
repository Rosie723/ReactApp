
import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  axios.post('/users', {
    username: 'newuser',
    password: 'password123'
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:3000/users', {
        username,
        password,
      });
      
      console.log(response.data);
      alert('User added!');
      setUsername('');  // Clear the username input
      setPassword('');  // Clear the password input
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user!');
    }
  };

  return (
    <div>
      <h3>Add User</h3>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default AddUser;
