const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const moment = require('moment'); //For handling of date/time in mongoose
const $ = require('jquery');
require('dotenv').config();
const app = express();
const session = require('express-session')

const PORT = 2800 || process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

const db = mongoose.connection;
const router = express.Router();

//MongoDB Connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log('the connection with mongod is established')
})

//Connection Logging
db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))

//Middleware functions
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.locals.moment = moment; // this makes moment available as a variable in every EJS page

//Sessions
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

//Controllers
const dietController = require('./controllers/diet');
app.use('/diets', dietController);

const userController = require('./controllers/users.js')
app.use('/users', userController);

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController);

//Port Listening
app.listen(PORT, ()=> {
    console.log(`I'm listening to ${PORT}`);
})