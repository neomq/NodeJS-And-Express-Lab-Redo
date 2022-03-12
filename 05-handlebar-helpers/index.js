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

// register some handlebar helpers
// first argument is the name of the handlebar written in the hbs file
// second argument is a function
hbs.registerHelper('ifEquals', function(arg1, arg2, options){
    if (arg1 == arg2){
        return options.fn(this); // indicate a true result
    } else {
        return options.inverse(this); // false result
    }
})
// using ternary operator for above example
// hbs.registerHelper('ifEqualsEx', function(arg1, arg2, options){
//     return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
// })


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

app.get('/fruits', function(req,res){
    res.render('fruits', {
        'fruits': ['apples', 'bananas', 'cherries', 'durians'],
        'likesFruit': true,
        'age': 33
    })
})

app.listen(3000, function(){
    console.log("server has started");
})