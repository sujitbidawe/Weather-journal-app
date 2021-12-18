// Global Variables
const weatherMapAPIPersonalKey = "8c7739e6678bc414db460b7f5a6c6c39";
const weatherMapBaseURL = `http://api.openweathermap.org/data/2.5/weather?appid=${weatherMapAPIPersonalKey}`;
const backendUrl = "http://localhost:4600";
// Global Variables End

// Function for getting zipcode from UI
function getZipCode(){
    const zipCodeElement = document.getElementById('zip');
    if (zipCodeElement) {
        return zipCodeElement.value;   
    }
    return "";
}

// Function for generating current date
function getDate(){
    let date = new Date();
    let newDate = date.getMonth()+'/'+ date.getDate()+'/'+ date.getFullYear();
    return newDate;
}

// Function to allow only numeric values in the zip code input
function onlyNumbers($event){
    var keyCode = ($event.keyCode ? $event.keyCode : $event.which);
    if ((keyCode < 48 || keyCode > 57)){
        $event.preventDefault();
    }
}

// API call for fetching weather status
const getWeather = async (url= '', zipCode = '') => {
    const weatherQueryUrl = `${url}&zip=${zipCode}`;
    const res = await fetch(weatherQueryUrl);
    try {
        const weatherData = await res.json();
        return weatherData;
    }
    catch(error) {
        console.log("error", error);
    }
}

// Function for fetching weather status
function getWeatherFn(url='', zipCode='') {
    getWeather(url, zipCode).then(function(weatherData={}) {
        const data = {
            'temperature'   : weatherData.main.temp,
            'date'          : getDate(),
            'user_response' : getUserFeelings()
        }
        return data;
    }).then(function (data={}) {
        postDataToServer(backendUrl+'/', data);
        return data;
    }).then(function (data={}) {
        displayDataOnUI(data.date, data.temperature, data.user_response);
    });
}

// Function for getting user feelings from UI
function getUserFeelings() {
    const feelings = document.getElementById('feelings');
    return feelings || "";
}

// Function for displaying data on UI
function displayDataOnUI(date, temperature, content) {
    document.getElementById('date').innerText = date;
    document.getElementById('temp').innerText = temperature;
    document.getElementById('content').innerText = content.value;
}

// Function to add weather data to server
const postDataToServer = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Function to fetch weather status from openWeatherMap
function generatePostWeather(url='', zipCode='') {
    getWeather(url, zipCode).then(function(weatherData={}) {
        const data = {
            'temperature'   : weatherData.main.temp,
            'date'          : getCurrentDate(),
            'user_response' : getUserResponse().value
        }
        return data;
    }).then(function (data={}) {
        console.log(data);
        postData(backendUrl+'/', data);
        return data;
    }).then(function (data={}) {
        updateUI(data.date, data.temperature, data.user_response);
    });
}

// Event listener for click button
window.addEventListener('DOMContentLoaded', () => {
    const zipInput = document.getElementById('zip');
    zipInput && zipInput.addEventListener("keypress", onlyNumbers);
    const generateButton = document.getElementById('generate');
    generateButton && generateButton.addEventListener("click", function() {
        getWeatherFn(weatherMapBaseURL, getZipCode());
    });
});