const express = require('express');
const router = express.Router();

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
                res.redirect('/dashboard');
            } else {
                res.render('../views/login', { errorMessage: 'Invalid username or password' });
            }
        } else {
            res.render('../views/login', { errorMessage: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

app.get('/dashboard', (req, res) => {
    // Check if user cookie exists
    if (req.cookies.user) {
        const userData = JSON.parse(req.cookies.user);
        res.render('../views/dashboard', { username: userData.username });
    } else {
        res.redirect('/');
    }
});

app.post('/logout', (req, res) => {
    // Clear cookie on client-side
    res.clearCookie('user');
    res.redirect('/');
});


module.exports = router;