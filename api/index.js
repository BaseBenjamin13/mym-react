const express = require('express');
const axios = require('axios');
require('dotenv').config();
require('ejs');
const router = express();
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


router.set('view engine', 'ejs');

router.use(express.static(path.join(__dirname, '../public')));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(flash());
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());



router.get('/', (req, res) => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
        .then(data => {
            if (req.isAuthenticated()) {
                res.render('/home', {data: data.data, user: req.user})
            } else {
                res.render('/home', {data: data.data, user: false})
            }
        })
        .catch(err => console.log(err))
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', { 
    successRedirect: '/api/picture',
    failureRedirect: '/api/picture',
    failureFlash: true
}))

router.post('/register', checkNotAuthenticated, async (req, res) => {
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
                res.redirect('/api/picture');
                return users = usersR;
            })
            .catch(console.error);
        })
    } else {
        res.redirect('/api/picture');
        console.log('username and password are required');
    }
})

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if(err) return next(err);
        res.redirect('/api/picture');
    });
})


function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return res.redirect('/api/picture');
    }
    next();
}

module.exports = router;



