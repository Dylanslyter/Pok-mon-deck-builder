const bcrypt = require('bcrypt');
const User = require('../models/User');

async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.length < 3) {
    return res.status(400).json({ error: 'Invalid search parameter: username' });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ message: 'Login successful' }); 
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function signupUser(req, res) {

    try {
        const { username, email, password } = req.body;
        if (users.some(user => user.username === username || user.email === email)) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { username, email, password: hashedPassword };

        users.push(newUser);

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { loginUser, signupUser };