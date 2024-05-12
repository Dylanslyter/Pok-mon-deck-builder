const bcrypt = require('bcrypt');
const User = require('../models/User');

async function loginUser(req, res) {
  const { username, password } = req.body;

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
  res.json({ message: 'Signup successful' }); 
}

module.exports = { loginUser, signupUser };