const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { sequelize } = require('./config/connection'); 
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'supersecret',
  cookie: {
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, 
    httpOnly: true, 
    sameSite: 'Lax' 
  },
  resave: false,
  saveUninitialized: true,
  store: new (require('connect-session-sequelize')(session.Store))({ db: sequelize })
};

app.use(session(sessionConfig));

app.use('/api', apiRoutes);
app.use('/', webRoutes);

const expressHandlebars = require('express-handlebars');
const handlebars = expressHandlebars.create({});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
sequelize.sync({
  force:false
}).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});



