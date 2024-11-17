const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.SERVER_PORT || 5000;
const pagesRouter = require('./routes/pages');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport-config');
const methodOverride = require('method-override')

// Passport configuration
initializePassport(passport);
//Engine
app.set('view engine', 'ejs');
//End
app.use(flash());
app.use(session({
    // secret: process.env.SESSION_SECRET,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
//
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))     
//
app.use('/public',express.static('public'))
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json())
//Routes
app.use('/', pagesRouter);
app.use('/auth', authRouter);

//End
app.listen(port , ()=> {
    console.log('> Server is up and running on port : ' + port)
})