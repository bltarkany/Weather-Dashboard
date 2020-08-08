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
    // append to frontend card
    $('#history').append(cityBtn);
}

// function to call for todays weather
function weather(city) {
    // create query search 
    let query = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    // ajax call
    $.ajax({
        url: query,
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            console.log(res);
            // add our city to local storage and create a new button for the city
            while (history.indexOf(city) === -1) {
                history.push(city);
                window.localStorage.setItem('history', JSON.stringify(history));
                newCity(city);
            }
            // create elements for the weather 
            $('#today').empty();
            console.log(res.name);
            console.log(res.weather[0].description);
            let name = $('<h3>').addClass('card-tile').text(res.name);
            let icon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${res.weather[0].icon}.png`);
            let description = $('<p>').text(`Skies:   ${res.weather[0].description}`);
            let temp = $('<p>').text(`Current Temperature:   ${res.main.temp}° F`);
            let feels = $('<p>').text(`Feels Like:   ${res.main.feels_like}° F`);
            let humidity = $('<p>').text(`Humidity:   ${res.main.humidity}%`);
            let max = $('<p>').text(`Today's High Temp:   ${res.main.temp_max}° F`);
            let min = $('<p>').text(`Today's Low Temp:   ${res.main.temp_min}° F`);
            let wind = $('<p>').text(`Wind Speed:    ${res.wind.speed} mph`);
            let uvi = uv(res.coord.lat, res.coord.lon);
            let displayUV = $('<p>').text(`UV Index:  `);

            let content = $('<div>')
                .attr('id', 'weather')
                .addClass('card-content')
                .append(name, icon, description, temp, feels, humidity, max, min, wind, displayUV.append(uvi));

            $('#today').append(content);

            // call the UV index function
            // console.log(res.coord.lat, res.coord.lon);
            // uv(res.coord.lat, res.coord.lon);

            // call 5 day forecast 
            forecast(city);
        }
    });

}

// function to call todays UV index
function uv(lat, lon) {
    let query = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    // ajax call for uv index
    let uvIndex = $('<button>').addClass('waves-effect waves-teal btn-flat')
    $.ajax({
        url: query,
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            console.log(res.value);
            // let uvIndex = $('<button>')
            //     .addClass('waves-effect waves-teal btn-flat')
                uvIndex.text(res.value);
            if(res.value < 3) {
                uvIndex.addClass('green');
            } else if(res.value >= 3 && res.value < 7){
                uvIndex.addClass('yellow');
            } else {
                uvIndex.addClass('red');
            }

            // let displayUV = $('<p>').text(`UV Index:  `);
            // $('#weather').append(displayUV.append(uvIndex));
        }
    });
    return uvIndex;
}
// function to call for 5 day forecast
function forecast(city) {
    var query = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    $.ajax({
        url: query,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            let days = res.list.filter((reading) => {
                return reading.dt_txt.includes("15:00:00")
            });
            console.log(days);
            // for(let i = 0; i < res.list.length; i++) {
            //     if (res.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            //         console.log(res.list[i]);
            //     }
            // }
        }
    });
}


$(document).ready(function () {

    // on click event for search city
    $('#search-btn').on('click', function () {
        console.log('search clicked');
        // grab the value from the input
        let city = $('#city').val().trim();
        console.log(city);
        // run the functions with the city
        weather(city);
        // empty the value in the input section
        $('#city').val('');
    });

    // onclick of the history buttons -- grab the div then the button - jQuery issue
    $('#history').on('click', 'button', function () {
        // search the city based on the value of the button
        weather($(this).val());
    });

    // create buttons for search history based on local storage
    for (var i = 0; i < history.length; i++) {
        newCity(history[i]);
    }
});