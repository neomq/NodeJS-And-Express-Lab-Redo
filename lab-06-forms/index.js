// 1. Setup
// 2. Routes
// 3. Listen

// 1. Setup /////////////////////////////
const express = require('express');
const hbs = require('hbs');
const waxOn = require ('wax-on');

const app = express();
app.set('view engine', 'hbs');
waxOn.on(hbs.handlebars);
waxOn.setLayoutPath('./views/layouts')

app.use(express.static('public'));

// Enable forms
app.use(express.urlencoded({extended:false}));

// 2. Routes /////////////////////////////
app.get('/add-food', function(req,res){
    res.render('add-food')
})

// intercept the data of the form that is rendered at GET/add-food
app.post('/add-food', function (req,res){
    let foodName = req.body.foodName || "";
    let calories = req.body.calories || "";
    let meal = req.body.meal || "breakfast";
    let description = req.body.description || "";

    // Checkboxes:
    // If select more than 1 => Array
    // If select only 1 => String
    // If none selected => will not show up in req.body

    // Straightforward Method
    // let tags = null;
    // // req.body.tags is truly if it is not undefined
    // if (req.body.tags) {
    //     // req.body.tags is either a single string or an array of strings
    //     if (Array.isArray(req.body.tags)){
    //         tags = req.body.tags
    //     } else {
    //         // else req.body.tags is a single string
    //         tags = [req.body.tags]
    //     }
    // } else {
    //     // req.body.tags is undefined then we set tags to be an empty array
    //     tags = []
    // }

    // Elegant Method
    let tags = req.body.tags || [];
    tags = Array.isArray(tags) ? tags : [tags];


    console.log(req.body);
    console.log("tags =", tags);
    res.send("Form received");
})




// 3. Listen /////////////////////////////
app.listen(3000, function(){
    console.log("server has started");
})