// const mongoose = require("mongoose");
// require('dotenv').config();

// const mongoURI = 
//     process.env.NODE_ENV === 'production'
//     ? process.env.DB_URL
//     : `mongodb+srv://benjamin_m:${process.env.DEV_DB_PASS}@cluster0.9xnz1.mongodb.net/mym-assessment?retryWrites=true&w=majority`

// mongoose.connect(`${mongoURI}`)
//     .then(instance => console.log(`connected to: ${instance.connections[0].name}`))
//     .catch(error => console.log(`failed conn:`, error))

// module.exports = mongoose

const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect(`mongodb+srv://benjamin_m:${process.env.REACT_APP_DB_PASS}@cluster0.9xnz1.mongodb.net/mym-assessment?retryWrites=true&w=majority`, { useNewUrlParser: true })
.then((conn) => {
    console.log(`connected to mym assessment DB`);
})
.catch(err => {
    console.error(err);
})

module.exports = mongoose;