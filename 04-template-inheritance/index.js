const express = require('express');
const app = express();
const waxOn = require ('wax-on');

// Initialise hbs
const hbs = require('hbs');
// tell express we are using hbs as our view engine
// a 'view engine' allows us to render HTML from template files
app.set('view engine', 'hbs');

// Setup wax-on
waxOn.on(hbs.handlebars);
// Set the layout directory
waxOn.setLayoutPath('./views/layouts')

// Routes
app.get('/', function(req,res){
    res.render('index')
})

app.get('/about-us', function(req,res){
    res.render('about-us')
})

app.get('/contact-us', function(req,res){
    res.render('contact-us')
})

app.listen(3000, function(){
    console.log("server has started");
})