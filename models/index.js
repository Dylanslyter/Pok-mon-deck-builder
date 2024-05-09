const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Dummy database for demonstration (replace with actual database)
const users = [];

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Store user data (in-memory database for demonstration)
        users.push({ username, password: hashedPassword });
        res.status(201).send('User registered successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = users.find(user => user.username === username);
        if (user) {
            // Compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                // Set cookie containing user data
                res.cookie('user', JSON.stringify({ username }));
                res.status(200).send('Login successful!');
            } else {
                res.status(401).send('Invalid username or password');
            }
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

// Logout route
app.post('/logout', (req, res) => {
    // Clear cookie on client-side
    res.clearCookie('user');
    res.status(200).send('Logout successful!');
});

// Protected route example
app.get('/protected', (req, res) => {
    // Check if user cookie exists
    if (req.cookies.user) {
        const userData = JSON.parse(req.cookies.user);
        res.status(200).send(`Welcome back, ${userData.username}!`);
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));