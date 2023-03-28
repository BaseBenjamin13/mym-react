const express = require('express');
const axios = require('axios');
require('dotenv').config();
require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.use(express.json());


app.get('/', (req, res) => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
        .then(data => {
            // console.log(data.data.hdurl);
            res.render('./home', {data: data.data})
        })
        .catch(err => console.log(err))
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server ${port} is running`);
})