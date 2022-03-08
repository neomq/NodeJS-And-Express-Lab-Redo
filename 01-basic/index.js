// 1.
// Import in the express function from node_modules/express
// Assign it to a variable named 'express'
const express = require('express');

// 2.
// Create an express application
const app = express();

// 3.
// Routes
// - must come before app.listen but after creating 'app'
// route is a url that is associated with the function
// 1st parameter - req: request - being sent by the browser (client)
// 2nd parameter - res: response - what the server will send back
app.get('/', function(req,res){
    res.send("Hello world");
})

app.get('/about-us', function(req,res){
    res.send('about us');
})
// browser send url as request to express server
// server will receive the request
// if the url matches, function will execute and server sends back 'about-us' to the browser

app.get('/contact-us', function(req,res){
    res.send('<h1>contact us</h1>');
})

// 4.
// Start the server
// 1st arg of app.listen is port number
app.listen(3000, function(){
    console.log("server has started");
})