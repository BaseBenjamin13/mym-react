const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const User = require('./db/models/userM');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');


app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api', (req, res) => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`)
        .then(data => {
            res.json({ data: data.data })
        })
        .catch(err => console.log(err))
})
app.post('/api/login', (req, res) => {
    if (req.body.userName && req.body.password) {
    User.find({ userName: req.body.userName })
        .then(async (user) => {
            if(user.length){
                if (await bcrypt.compare(req.body.password, user[0].password)) {
                    if (user[0].userName) res.json(user[0])
                } else {
                    res.json({ errMessage: 'Sorry, wrong password.'})
                }
            }else {
                res.json({ errMessage: "Sorry, wrong username." })
            }
        })
        .catch(err => console.log(err))
    } else {
        res.json({ errMessage: "username and password are required." })
    }
})

app.post('/api/register', async (req, res) => {
    if (req.body.userName && req.body.password) {
        User.find({ userName: req.body.userName })
            .then( async (user) => {
                if (!user.length) {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10)
                    User.create({
                        userName: req.body.userName,
                        password: hashedPassword
                    })
                        .then(() => {
                            User.find({ userName: req.body.userName })
                                .then(async (user) => {
                                    if (await bcrypt.compare(req.body.password, user[0].password)) {
                                        if (user[0].userName) res.json(user[0])
                                    } else {
                                        res.json('Sorry, invalid username or password.')
                                    }
                                })
                                .catch(console.error);
                        })
                } else {
                    res.json({ errMessage: "Sorry, this username is taken." })
                }
            })
    } else {
        res.json({ errMessage: "username and password are required" })
    }
})


if (process.env.REACT_APP_PORT) {
    app.listen(process.env.REACT_APP_PORT, () => {
        console.log(`server ${process.env.REACT_APP_PORT} is running`);
    })
}

module.exports = app;