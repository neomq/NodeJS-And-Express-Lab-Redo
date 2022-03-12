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






// 3. Listen /////////////////////////////
app.listen(3000, function(){
    console.log("server has started");
})