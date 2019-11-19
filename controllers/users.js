const express = require('express');
const users = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//Route: /users/new
users.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

//Route: /users
users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        if (err) {
            console.log(err)
        }
        console.log(createdUser);
        res.redirect('/sessions/new');
    })
})

//Route: users/
// users.post('/', (req, res)=>{
//     //overwrite the user password with the hashed password, then pass that in to our database
//     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
//     User.create(req.body, (err, createdUser)=>{
//         res.redirect('/sessions');
//     })
// })

module.exports = users;