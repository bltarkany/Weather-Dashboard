// global variable
const apiKey = "91a8aba9a4e777059b0459d4f649ec84";




// global functions

// function to create history buttons
function newCity(city) {
    // create button with the value of the city and styling
    let cityBtn = $('<button>')
        .val(city)
        .addClass('waves-effect waves-teal btn-flat city-btn')
        .text(city);
    // add onClick to each button 
    cityBtn.onClick = handleOnClick;
    // append to frontend card
    $('#history').append(cityBtn);
    // add the local storage

}

// load history from local storage to populate buttons
function history() {

}

// handle history button onclick
function handleOnClick() {

}

// function to call for todays weather
function weather(city) {

}

// function to call todays UV index
function uv(city) {

}
// function to call for 5 day forecast
function forecast(city) {

}


$(document).ready(function () {

    // on click event for search city
    $('#search-btn').on('click', function () {
        console.log('search clicked');
        // grab the value from the input
        let city = $('#city').val().trim();
        console.log(city);
        // run the functions with the city
        newCity(city);
        // empty the value in the input section
        $('#city').val('');
    });
});