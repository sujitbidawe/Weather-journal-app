// Require Express to run server and routes
const express = require('express');

// Require Body Parser to use it as middle-war
const bodyParser = require('body-parser');

// Cors for cross origin allowance
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
const projectData = [{asd: 1}];
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

function addWeather(req, res) {
    projectData.push(req.body);
    res.status(200).send('data added');
};

app.get('/all', function (req, res) {
    res.send(projectData);
});

app.post('/', addWeather);