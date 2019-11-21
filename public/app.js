$(() => {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/guessNutrition?title=fried%20chicken",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "64ce528540msh9f0638c905da23ap1ea3cdjsnd4567ecd5279"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
})