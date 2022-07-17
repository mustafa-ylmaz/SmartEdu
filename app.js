const express = require('express');
const mongoose = require('mongoose');

var cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
//connect db
mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log(err)
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);






app.listen(port, () => console.log(`Listening on port ${port}...`));