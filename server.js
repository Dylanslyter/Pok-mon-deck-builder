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

// Define session
// const sess  = {
//     secret: 'Super secret secret', //not sure how to hash this
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new sequelizeStore({
//         db: sequelize
//     })};

// app.use(session(sess));

// Define routes
app.use('/api', require('./controllers/authRoutes'));

// Define handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});