const bcrypt = require('bcrypt');
const { User } = require('../../models/');
const session = require('express-session');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || email.length < 3) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    req.session.save(() => {
      req.session.user = user;
      req.session.loggedIn = true;
    
      res.json({ 'Login successful' });
    })

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
};

async function signupUser(req, res) {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
      
        if (user) {
            return res.status(400).json({ error: 'Email already exists' });
        };

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({ ...req.body, password:hashedPassword} );
        res.status(201).json({ message: 'Signup successful' });
        } 

    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };


  const logout = (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      res.clearCookie('user');
  
      res.redirect('/');
    });
  };

module.exports = { loginUser, signupUser, logout };

