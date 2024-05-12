const express = require('express');
const app = express();
const port = 3000;
const { sequelize } = require('./config/connection'); // Import sequelize instance
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRoutes = require('./controllers/authRoutes');
const apiRoutes = require('./controllers/api');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'supersecret',
  cookie: {
    secure: true, // Cookies are only sent over HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Session expires after 1 day (adjust as needed)
    httpOnly: true, // Cookies are not accessible via client-side JavaScript
    sameSite: 'Lax' // Restrict cookies to same-site requests only
  },
  resave: false,
  saveUninitialized: true,
  store: new (require('connect-session-sequelize')(session.Store))({ db: sequelize }) // Initialize session store
};

app.use(session(sessionConfig));

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

const expressHandlebars = require('express-handlebars');
const handlebars = expressHandlebars.create({});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


