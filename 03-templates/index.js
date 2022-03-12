const express = require('express');
const app = express();

// initialise hbs
const hbs = require('hbs');
// tell express we are using hbs as our view engine
// a 'view engine' allows us to render HTML from template files
app.set('view engine', 'hbs');

// Setup static folder
app.use(express.static('public'));

// Routes
app.get('/', function(req,res){
    res.render('index.hbs');
})

app.get('/lucky', function(req,res){
    let lucky = Math.floor(Math.random() * 100 + 1);
    // when we send back hbs file as the response,
    // use res.render()
    res.render('lucky', {
        // the key is the object of the variable nbame in the hbs
        'luckyNumber': lucky
    })
})

app.listen(3000, function(){
    console.log("server has started");
})