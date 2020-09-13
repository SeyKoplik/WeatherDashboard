$(document).ready(function () {
    //posted date on current city
    var datePosted = moment().format('MMMM Do, YYYY');
    $("#dateToday").text(datePosted);
    //pseudocode the weather forecast........
    //I enter a city in search bar and click submit 
    // Clicking submit adds the city into a list on the sidebar
    // city's 5 day forecast is posted
    //five day forcast include
    //day following whatever TODAY is
    // post 2 days after
    // post 3 days after
    // post 4 days after
    // post 5 days after
    // When I click on the cities that was added in search... I can do the same thing as the others
    // When I refresh the page, all the information is saved in local storage so I can click again
    //When I click on the cities that is on the list they display all the weather information that I require to be displayed

    var newCityInput = "Chicago" //<<!!!!!! $("#newCityInput").val();
    var APIKey = "3742e75c5eab1e1270af15a06e17b552";

    function ajaxCallWeatherDataDisplay() {
        // Here we are building the URL we need to query the database
        var queryURLweather = "https://api.openweathermap.org/data/2.5/weather?q=" + newCityInput + "&appid=" + APIKey;
        // We then created an AJAX call
        $.ajax({
            url: queryURLweather,
            method: "GET"
        }).then(function (weatherData) {
            // Create CODE HERE to Log the queryURL
            console.log(weatherData);
            console.log(convertedCityTemp);
            //New variable to located city name in the ajax JSON
            var cityName = weatherData.name;
            //displays City name that has been chosen
            $("#cityTyped").html(cityName);
            // Create CODE HERE to calculate the temperature (converted from Kelvin)
            var foundCityTemp = ((weatherData.main.temp) - 273.15) * 1.80 + 32;
            console.log(foundCityTemp);
            // setting temp to display with two decimals
            var convertedCityTemp = foundCityTemp.toFixed(2);
            console.log(convertedCityTemp);
            $("#cityTemp").html(convertedCityTemp + "&#8457;");
            var foundCityHumidity = weatherData.main.humidity;
            $("#cityHumidity").html(foundCityHumidity);
            var foundCityWindSpeed = weatherData.wind.speed;
            $("#cityWindSpeed").html(foundCityWindSpeed);
            ajaxCallUvIndex();

            function ajaxCallUvIndex() {
                var cityLat = weatherData.coord.lat;
                var cityLong = weatherData.coord.lon;

                var queryURLuvi = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLong
                // We then created an AJAX call
                $.ajax({
                    url: queryURLuvi,
                    method: "GET"
                }).then(function (weatherUviData) {
                    var foundUvIndex = weatherUviData.value;
                    $("#cityUvIndex").html(foundUvIndex);
                    if (foundUvIndex >=0 || foundUvIndex <=2){
                        $("#cityUvIndex").addClass("low");
                    }
                    if (foundUvIndex >= 3 || foundUvIndex <=5) {
                        $("#cityUvIndex").addClass("medium");
                    }
                    if (foundUvIndex >=6 || foundUvIndex <= 7) {
                        $("#cityUvIndex").addClass("high");
                    }
                    if (foundUvIndex >=8 || foundUvIndex <= 10) {
                        $("#cityUvIndex").addClass("veryhigh");
                    }
                    if (foundUvIndex >= 11){
                        $("#cityUvIndex").addClass("extreme");
                    }
                });
            }
        });
    }
    //I am presented with the following information
    // City name posted
    // City temperature posted
    // City Wind Speed Posted
    // City UV index
    ajaxCallWeatherDataDisplay();




    //     console.log(convertTemp);
    //     var city = response.name;
    //     var wind = response.wind.speed;
    //     var f = (convertTemp - 273.15) * 1.80 + 32
    //     console.log(Math.round(f));
    //     // Create CODE HERE to transfer content to HTML
    //     $(".city").html("<h1>"+city+"</h1>");
    //     $(".wind").text("Wind: "+wind);

    // // function displayWeatherInfo() {

    // // }

    // function renderCityLinks() {
    //     $(".newCityList").empty();

    //     for(var i=0; i<)
    // }

});