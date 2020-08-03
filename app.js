// global variable
const apiKey = "91a8aba9a4e777059b0459d4f649ec84";

// grab local storage for search history or equals an empty array
let history = JSON.parse(window.localStorage.getItem('history')) || [];


// global functions

// function to create history buttons
function newCity(city) {
    // create button with the value of the city and styling
    let cityBtn = $('<button>')
        .val(city)
        .addClass('waves-effect waves-teal btn-flat city-btn')
        .text(city);
    console.log(cityBtn);
    // append to frontend card
    $('#history').append(cityBtn);

}

// function to call for todays weather
function weather(city) {
    let query = 
    $.ajax({
        url: query
    });

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

    // onclick of the history buttons -- grab the div then the button - jQuery issue
    $('#history').on('click', 'button', function(){
        console.log($(this).val());
        // search the city based on the value of the button
        weather($(this).val());
    });

    // create buttons for search history based on local storage
    for(var i = 0; i < history.length; i++){
        newCity(history[i]);
    }
});