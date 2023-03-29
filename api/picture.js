const express = require('express');
const axios = require('axios');
require('dotenv').config();
require('ejs');
const app = express();
const User = require('../db/models/userM');

const path = require('path');
const bcrypt = require('bcrypt');
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



app.get('/', (req, res) => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
        .then(data => {
            if (req.isAuthenticated()) {
                res.render('./home', {data: data.data, user: req.user})
            } else {
                res.render('./home', {data: data.data, user: false})
            }
        })
        .catch(err => console.log(err))
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}))

app.post('/register', checkNotAuthenticated, async (req, res) => {
    console.log(req.body)
    if (req.body.userName && req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        User.create({
            userName: req.body.userName,
            password: hashedPassword
        })
        .then(() => {
            User.find()
            .then((usersR) => {
                res.redirect('/');
                return users = usersR;
            })
            .catch(console.error);
        })
    } else {
        res.redirect('/');
        console.log('username and password are required');
    }
})

app.post('/logout', (req, res) => {
    req.logout((err) => {
        if(err) return next(err);
        res.redirect('/');
    });
})


function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}



