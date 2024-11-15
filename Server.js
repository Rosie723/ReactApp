
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',     // Your MySQL host
  user: 'root',          // Your MySQL username
  password: '123456789',  // Your MySQL password
  database: 'Inventory' // Your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
// Get all users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM user';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({ error: 'Failed to retrieve users from the database' });
    }
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for missing username or password
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const sql = 'INSERT INTO user (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        console.error('Error inserting user:', err.code, err.message);
        return res.status(500).json({ message: 'Database error while inserting user', error: err.message });
      }

      // Return success message with the new user's id
      res.status(201).json({ id: results.insertId, username });
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user to the database' });
  }
});


// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM user WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err.message);
      return res.status(500).json({ error: 'Database error while deleting user' });
    }
    if (results.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const sql = 'UPDATE user SET username = ?, password = ? WHERE id = ?';
  db.query(sql, [username, password, id], (err, results) => {
    if (err) {
      console.error('Error updating user:', err.message);
      return res.status(500).json({ error: 'Database error while updating user' });
    }
    if (results.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully' });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
