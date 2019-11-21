$(() => {
    const calcCalories = (calArray) => {
        
        // get sum of msgCount prop across all objects in array
        let caloriesTotal = calArray.reduce(function(prev, cur) {
            return prev + cur.calories;
        }, 0);
        
        console.log('Total Calories:', caloriesTotal); 
        $('#idStats').text(caloriesTotal);
    }
})