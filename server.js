
const express = require('express');
const app = express();
const port = 3000;
const expressHandlebars = require('express-handlebars');
const routes = require('./controllers/api');
const path = require('path');
const session = require('express-session');
// const helpers = require('./utils/helpers'); // not sure if needed

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const handlebars = expressHandlebars.create({ helpers });

// Define middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Define session
const sessionConfig = {
    secret: sessionSecret,
    cookie: {
        secure: true, // Cookies are only sent over HTTPS
        maxAge: 24 * 60 * 60 * 1000, // Session expires after 1 day (adjust as needed)
        httpOnly: true, // Cookies are not accessible via client-side JavaScript
        sameSite: 'Lax' // Restrict cookies to same-site requests only
    },
    resave: false,
    saveUninitialized: true,
    store: sessionStore
};

// Define routes
app.use('/api', require('./controllers/authRoutes'));

// Define handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(routes);

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
                res.render('login', { errorMessage: 'Invalid username or password' });
            }
        } else {
            res.render('login', { errorMessage: 'Invalid username or password' });
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
        res.render('dashboard', { username: userData.username });
    } else {
        res.redirect('/');
    }
});

app.post('/logout', (req, res) => {
    // Clear cookie on client-side
    res.clearCookie('user');
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});