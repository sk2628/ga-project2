const express = require('express');
const router = express.Router();
const Diet = require('../models/diet');
const moment = require('moment'); //For handling of date/time in mongoose

router.get('/seed', async (req, res) => {
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

//Index Route
router.get('/', (req, res) => {
    Diet.find({}, (error, data) => {
        res.render(`index.ejs`, {
            dietModel: data
        });
    })
})

//New Route 
router.get('/new', (req, res) => {
    Diet.find({}, (error, data) => {
        res.render(`new.ejs`, {
            dietModel: data
        });
    })
})

//Create Route
router.post('/', (req, res) => {
    Diet.create(req.body, (error, data) => {
        if (error){
            console.log("Error Detected: " + error.message);
        }
        console.log ( `New diet logged!` );
    })
    res.redirect('/diets');
})

//Show Route
router.get('/:id', (req, res) => {
    Diet.findById(req.params.id, (err, foundDiet) => {
        res.render(
            'show.ejs',
            {
                dietModel: foundDiet
            }
        );
    });
})

//Edit Route
router.get('/:id/edit', (req, res) => {
    Diet.findById(req.params.id, (err, foundDiet) => {
        var newDate = moment(foundDiet.consumeTime).format("YYYY-MM-DDThh:mm");
        res.render(
            'edit.ejs',
            {
                dietModel: foundDiet,
                formattedConsumeTime: newDate
            }
        )
    })
})

//Update Route
router.put('/:id', (req, res) => {
    Diet.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
        res.redirect('/diets');
    })
})

//Destroy Route
router.delete('/:id', (req, res) => {
    Diet.findByIdAndDelete(req.params.id, (err, foundDiet) => {
        res.redirect('/diets');
    });
})

module.exports = router;