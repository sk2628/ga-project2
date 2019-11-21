const express = require('express');
const diets = express.Router();
const Diet = require('../models/diet');
const moment = require('moment'); //For handling of date/time in mongoose

//Route: diets/seed
diets.get('/seed', async (req, res) => {
    const newDiets =[
        {
            foodName: 'Chicken Rice',
            foodDescription: 'Chicken Rice + Egg',
            image: 'https://steamykitchen.com/wp-content/uploads/2009/08/hainanese-chicken-lg-691.jpg',
            calories: 333
        }, 
        {
            foodName: 'Ice Coffee',
            foodDescription: 'Iced Coffee',
            image: 'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Premium-Roast-Iced-Coffee-Medium.jpg?$Product_Desktop$',
            calories: 70
        }
    ]

    try {
        const seedItems = await Diet.create(newDiets)
        res.send(seedItems)
    } 
    catch (err) {
        res.send(err.message)
    }
})

//Route: /diets
diets.get('/', (req, res) => {
    if (!req.session.currentUser){
        res.render(`default.ejs`, {currentUser: req.session.currentUser});
    }
    else{
        Diet.find({user: req.session.currentUser._id}, (error, data) => {
            console.log(data);
                            
            let caloriesTotal =  data.reduce(function(prev, cur) {
                return prev + cur.calories;
            }, 0);

            res.render(`index.ejs`, {
                dietModel: data,
                currentUser: req.session.currentUser,
                caloriesTotal: caloriesTotal
            });
        })
    }
})

//Route: /diets/new
diets.get('/new', (req, res) => {
    Diet.find({}, (error, data) => {
        res.render(`new.ejs`, {
            dietModel: data,
            currentUser: req.session.currentUser
        });
    })
})

//Route: /diets
diets.post('/', (req, res) => {
    req.body.user = req.session.currentUser._id;
    Diet.create(req.body, (error, data) => {
        if (error){
            console.log("Error Detected: " + error.message);
        }
        console.log ( `New diet logged!` );
    })
    res.redirect('/diets');
})

//Route: /diets/id
diets.get('/:id', (req, res) => {
    Diet.findById(req.params.id, (err, foundDiet) => {
        var newDate = moment(foundDiet.consumeTime).format("YYYY-MM-DDThh:mm");
        res.render(
            'show.ejs',
            {
                dietModel: foundDiet,
                formattedConsumeTime: newDate,
                currentUser: req.session.currentUser
            }
        );
    });
})

//Route: /diets/id/edit
diets.get('/:id/edit', (req, res) => {
    Diet.findById(req.params.id, (err, foundDiet) => {
        var newDate = moment(foundDiet.consumeTime).format("YYYY-MM-DDThh:mm");
        res.render(
            'edit.ejs',
            {
                dietModel: foundDiet,
                formattedConsumeTime: newDate,
                currentUser: req.session.currentUser
            }
        )
    })
})

//Route: /diets/id
diets.put('/:id', (req, res) => {
    Diet.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
        res.redirect('/diets');
    })
})

//Route: diets/id
diets.delete('/:id', (req, res) => {
    Diet.findByIdAndDelete(req.params.id, (err, foundDiet) => {
        res.redirect('/diets');
    });
})

module.exports = diets;