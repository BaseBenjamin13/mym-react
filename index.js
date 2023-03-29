const express = require('express');
require('dotenv').config();
require('ejs');
const app = express();
const User = require('../db/models/userM');
const picture = require('./api/picture');

const path = require('path');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('../passport-config');
initializePassport(
    passport,
    userName => users.find(user => user.userName === userName),
    id => users.find(user => user.id === id)
)

let users = [];
User.find()
    .then((usersR) => {
        return users = usersR;
    })
    .catch(console.error);


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/picture", picture);

app.get('/favicon.ico', (req, res) => res.status(204));


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server ${port} is running`);
})