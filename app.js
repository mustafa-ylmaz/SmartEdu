const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 3000;
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

//connect db
mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log(err)
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');


//GLOBAL VARIABLES
global.UserIN = null;

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:'mongodb://localhost/smartedu-db'})
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
app.use(methodOverride('_method'), methodOverride('X-HTTP-Method-Override'));


//ROUTES
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);





app.listen(port, () => console.log(`Listening on port ${port}...`));