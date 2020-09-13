$(document).ready(function () {
    //posted date on current city
    var datePosted = moment().format('MM/DD/YY)  ');
    $("#dateToday").text(datePosted);
    //posted date on current city for day 1 of 5 day forecast
    var dateOne = moment().add(1, 'day').format('MM/DD/YY');
    $("#dateDay1").text(dateOne);
    //posted date on current city for day 2 of 5 day forecast
    var dateTwo = moment().add(2, 'days').format('MM/DD/YY');
    $("#dateDay2").text(dateTwo);
    //posted date on current city for day 3 of 5 day forecast
    var dateThree = moment().add(3, 'days').format('MM/DD/YY');
    $("#dateDay3").text(dateThree);
    //posted date on current city for day 4 of 5 day forecast
    var dateFour = moment().add(4, 'days').format('MM/DD/YY');
    $("#dateDay4").text(dateFour);
    //posted date on current city for day 5 of 5 day forecast
    var dateFive = moment().add(5, 'days').format('MM/DD/YY');
    $("#dateDay5").text(dateFive);

    ///HOW TO POST A WEATHER ICON
    var weatherIcon = $("<img/>");
    weatherIcon.attr("src", "sun.png")
    $("#dateToday").append(weatherIcon);
    //===================================

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
            //take temp information to display what icon the weather is like
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
            ajaxCallForecast();

            //had to wrap the other ajax call in a function to call for uvindex information
            function ajaxCallUvIndex() {
                //needed to take latitude and longditude of city from previous ajax call
                var cityLat = weatherData.coord.lat;
                var cityLong = weatherData.coord.lon;
                // used a different url to set ajax call for uv index
                var queryURLuvi = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLong
                $.ajax({
                    url: queryURLuvi,
                    method: "GET"
                }).then(function (weatherUviData) {
                    var foundUvIndex = weatherUviData.value;
                    $("#cityUvIndex").html(foundUvIndex);
                    //then in order to display in different colors, we make statements for each range of ux index and adjust display attributes in css
                    if (foundUvIndex >= 0 || foundUvIndex <= 2) {
                        $("#cityUvIndex").addClass("low");
                    }
                    if (foundUvIndex >= 3 || foundUvIndex <= 5) {
                        $("#cityUvIndex").addClass("medium");
                    }
                    if (foundUvIndex >= 6 || foundUvIndex <= 7) {
                        $("#cityUvIndex").addClass("high");
                    }
                    if (foundUvIndex >= 8 || foundUvIndex <= 10) {
                        $("#cityUvIndex").addClass("veryhigh");
                    }
                    if (foundUvIndex >= 11) {
                        $("#cityUvIndex").addClass("extreme");
                    }
                });
                     };  

            function ajaxCallForecast() {
                // var dailyForecast = ["1,2,3,4,5"];

                var cityLat = weatherData.coord.lat;
                var cityLong = weatherData.coord.lon;

                var queryURLforecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLong +"&exclude=minutely&appid=" + APIKey;
                $.ajax({
                    url: queryURLforecast,
                    method: "GET"
                }).then(function (weatherForecastData) {
                    console.log(weatherForecastData);
                    var avgDailyTemp = ((weatherForecastData.daily[1].temp.min) + (weatherForecastData.daily[1].temp.max)) / 2;
                    var day1Temp = ((avgDailyTemp) - 273.15) * 1.80 + 32;
                    console.log(day1Temp);
                    // setting temp to display with two decimals
                    var convertedDay1Temp = day1Temp.toFixed(2);
                    console.log(convertedDay1Temp);
                    $("#tempDay1").html(convertedDay1Temp + "&#8457;");
                    var day1Humid = weatherForecastData.daily[1].humidity;
                    $("#humidDay1").html("Humidity: " + day1Humid +"%");
                    });
                }

        }); 
        
    };// --- end of function ajaxCallWeatherData Display

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
}); // ------ END OF EVERYTHING