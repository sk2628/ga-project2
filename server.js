const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
const db = mongoose.connection;
const router = express.Router();
const host = 3888;

//font installation
// npm install --save-dev @fortawesome/fontawesome-fre  e

//MongoDB Connection
const mongoURI = 'mongodb+srv://steve-admin:0Ptimad8@iapplytics-cluster-u4l8g.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
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

//Controllers
const dietController = require('./controllers/diet');
app.use('/diets', dietController);

//Port Listening
app.listen(host, ()=> {
    console.log(`I'm listening to ${host}`);
})