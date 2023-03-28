
const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect(`mongodb+srv://benjamin_m:${process.env.PASS}@cluster0.9xnz1.mongodb.net/mym-assessment?retryWrites=true&w=majority`, { useNewUrlParser: true })
.then((conn) => {
    console.log(`connected to mym assessment DB`);
})
.catch(err => {
    console.error(err);
})

module.exports = mongoose;