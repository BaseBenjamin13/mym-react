const express = require('express');
const axios = require('axios');
require('dotenv').config();
require('ejs');
const app = express();
const User = require('./db/models/userM');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');
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


app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(session({
    secret: process.env.REACT_APP_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/api', (req, res) => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(data => {
            if (req.isAuthenticated()) {
                console.log('Authenticated')
                res.json({data: data.data, user: req.user})
            } else {
                res.json({data: data.data, user: false})
                console.log('NOT Authenticated')
            }
        })
        .catch(err => console.log(err))
})
app.post('/api/login', (req, res) => {

    User.find({userName: req.body.userName})
        .then((user) => {
            if(bcrypt.compare(req.body.password, user[0].password)){
                res.json(user[0])
            } else {
                res.json('Sorry, wrong password.')
            }
        })
})
// app.post('/api/login', checkNotAuthenticated, passport.authenticate('local', { 
//     successRedirect: '/api',
//     failureRedirect: '/',
//     failureFlash: true
// }))
app.post('/api/register', checkNotAuthenticated, async (req, res) => {
    if (req.body.userName && req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        User.create({
            userName: req.body.userName,
            password: hashedPassword
        })
        .then(() => {
            User.find()
            .then((usersR) => {
                res.redirect('/api');
                return users = usersR;
            })
            .catch(console.error);
        })
    } else {
        res.redirect('/api');
        console.log('username and password are required');
    }
})
app.post('/api/logout', (req, res) => {
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
if(process.env.REACT_APP_PORT){
    app.listen(process.env.REACT_APP_PORT, () => {
        console.log(`server ${port} is running`);
    })
}

module.exports = app;