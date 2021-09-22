// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
// Require body-parser
const bodyparser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = process.env.PORT || 5500;
const server = app.listen(port, listening);
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

// GET route to get data and send it to the projectData object
app.get('/getData', getWeatherData);
function getWeatherData(req, res) {
    res.send(projectData);
}

// post route to get data from body and post it to the projectData
app.post('/saveData', save);
function save(req, res) {
    projectData =  {...req.body};
    res.send()
}

// GET route to get all data and send it to the projectData
app.get('/finalData', allData);
function allData(req, res) {
    res.send(projectData);
}


