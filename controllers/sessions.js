const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//Route: /sessions/new
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {userModel: null});
})

//Route: /sessions
sessions.post('/', (req, res) => {
    User.findOne({ username: req.body.username}, (err, foundUser) => {
    // if db error handle the db error
        if(err) {
            console.log(err)
            res.send('oops something went wrong')
        // if user not found, handle the error
        } else if (!foundUser) {
            res.render
            (
                'sessions/new.ejs',
                {userModel: "User ID not found. Please try again."}
            );
            //res.send('user not found!')
        }else {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/diets');
                // if passwords don't match, handle the error
            } else {
                res.render
                (
                    'sessions/new.ejs',
                    {userModel: "Password is incorrect. Please try again."}
                );
            }
        }
    })
})

//Route: /sessions
sessions.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/diets');
    })
})

module.exports = sessions;