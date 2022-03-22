// 1. Setup
// 2. Routes
// 3. Listen

// 1. Setup /////////////////////////////
const express = require('express');
const hbs = require('hbs');
const waxOn = require ('wax-on');
const axios = require ('axios'); // import in axios

const app = express();
app.set('view engine', 'hbs');
waxOn.on(hbs.handlebars);
waxOn.setLayoutPath('./views/layouts')

app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));


// API endpoint
const BASE_API_URL = "https://ckx-restful-api.herokuapp.com";

// 2. Routes /////////////////////////////

// READ //
app.get('/', async function(req,res){
    // res.send('Hello World!')
    let response = await axios.get(BASE_API_URL + '/sightings');
    // res.send(response.data);
    res.render('index', {
        'sightings': response.data
    })
})

// CREATE //
app.get('/sightings/create', async function(req,res){
    res.render('create')
})

app.post('/sightings/create', async function(req,res){
    // res.send(req.body); // echo back the form data
    // let description = req.body.description;
    // let food = req.body.food;
    // let datetime = req.body.datetime;
    // OR
    let { description, food, datetime } = req.body; // object destructuring

    food = food.split(','); // return an array of string and reassign back to food

    // let payload = {
    //     'description': description,
    //     'food': food,
    //     'datetime': datetime
    // }
    // OR
    let payload = { description, food, datetime };
    // only works if the variable name is the same as the name of the key

    // axios.post send a POST request to the endpoint
    // first arg: endpoint URL
    // second arg: the body (or the data to send)
    await axios.post(BASE_API_URL + '/sighting', payload);

    res.redirect('/'); // send a response back to the client and tell it to go to '/' route
})

// UPDATE //
app.get('/sightings/:sighting_id/update', async function(req,res){
    let sightingId = req.params.sighting_id;
    let response = await axios.get(BASE_API_URL + '/sighting/' + sightingId);
    let sighting = response.data;
    // console.log(sighting)
    
    // remove the last character needed to display the sighting datetime correctly
    sighting.datetime = sighting.datetime.slice(0, -1);

    res.render('update', {
        'sighting': sighting
    })  
})

app.post('/sightings/:sighting_id/update', async function(req,res){
    let payload = {
        'description': req.body.description,
        'food': req.body.food.split(','),
        'datetime': req.body.datetime
    }
    let sightingId = req.params.sighting_id;
    await axios.put(BASE_API_URL + '/sighting/' + sightingId, payload);
    res.redirect('/'); 
})

// DELETE //
app.get('/sightings/:sighting_id/delete', async function(req,res){
    let response = await axios.get(BASE_API_URL + '/sighting/' + req.params.sighting_id);
    let sighting = response.data;

    res.render('delete', {
        // 'sighting': sighting
        // OR
        sighting
    })
})

app.post('/sightings/:sighting_id/delete', async function(req,res){
    let response = await axios.delete(BASE_API_URL + '/sighting/' + req.params.sighting_id);
    res.redirect('/');
})


// 3. Listen /////////////////////////////
app.listen(3000, function(){
    console.log("server has started");
})