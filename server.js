// Require Express to run server and routes
const express = require('express');

// Require Body Parser to use it as middle-war
const bodyParser = require('body-parser');

// Cors for cross origin allowance
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
const projectData = {};
const port = 4600;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

function addData(req, res) {
    projectData['date'] = req.body.date;
    projectData['temperature'] = req.body.temperature;
    projectData['feelings'] = req.body.feelings;
    res.send(projectData);
};

app.get('/all', function (req, res) {
    res.send(projectData);
});

app.post('/', addData);