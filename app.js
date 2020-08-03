// global variable

// grab the value from the input
let city = $('#search').val();

// global functions

// function to create history buttons

// function to call for todays weather

// function to call todays UV index

// function to call for 5 day forecast


$(document).ready(function() {

    // on click event for search city
    $('#searchBtn').on('click', function() {
        console.log(city);
        // run the functions with the city

        // empty the value in the input section

    });
});