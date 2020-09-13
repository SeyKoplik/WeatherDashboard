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
    //pseudocode the weather forecast........
    //I enter a city in search bar and click submit 
    // Clicking submit adds the city into a list on the sidebar
    // city's 5 day forecast is posted
    // When I click on the cities that was added in search... I can do the same thing as the others
    // When I refresh the page, all the information is saved in local storage so I can click again
    //When I click on the cities that is on the list they display all the weather information that I require to be displayed

    var newCityInput = "cavite" //<<!!!!!! $("#newCityInput").val();

    //provide variable for api key for global use
    var APIKey = "3742e75c5eab1e1270af15a06e17b552";
    //wrap all ajax calls into a function to run
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
            console.log(weatherData);
            var weatherIcon = weatherData.weather[0].icon;
            console.log(weatherIcon);
            var iconurl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            var newIcon = $('<img/>');
            newIcon.attr("src", iconurl);
            $("#dateToday").append(newIcon);
            $("#cityTemp").html(convertedCityTemp + "&#8457;");
            var foundCityHumidity = weatherData.main.humidity;
            $("#cityHumidity").html(foundCityHumidity + "%");
            var foundCityWindSpeed = weatherData.wind.speed;
            $("#cityWindSpeed").html(foundCityWindSpeed + " mph");
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
                var cityLat = weatherData.coord.lat;
                var cityLong = weatherData.coord.lon;

                var queryURLforecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLong + "&exclude=minutely&appid=" + APIKey;
                $.ajax({
                    url: queryURLforecast,
                    method: "GET"
                }).then(function (weatherForecastData) {
                    var weatherIcon1 = weatherForecastData.daily[1].weather[0].icon;
                    console.log(weatherForecastData);
                    var iconurl1 = "http://openweathermap.org/img/wn/" + weatherIcon1 + ".png";
                    var newIcon1 = $('<img/>');
                    newIcon1.attr("src", iconurl1);
                    $("#weatherIconDay1").replaceWith(newIcon1);
                    var avgDay1Temp = ((weatherForecastData.daily[1].temp.min) + (weatherForecastData.daily[1].temp.max)) / 2;
                    var day1Temp = ((avgDay1Temp) - 273.15) * 1.80 + 32;
                    var convertedDay1Temp = day1Temp.toFixed(2);
                    $("#tempDay1").html(convertedDay1Temp + "&#8457;");
                    var day1Humid = weatherForecastData.daily[1].humidity;
                    $("#humidDay1").html("Humidity: " + day1Humid + "%");

                    var weatherIcon2 = weatherForecastData.daily[2].weather[0].icon;
                    var iconurl2 = "http://openweathermap.org/img/wn/" + weatherIcon2 + ".png";
                    var newIcon2 = $('<img/>');
                    newIcon2.attr("src", iconurl2);
                    $("#weatherIconDay2").replaceWith(newIcon2);
                    var avgDay2Temp = ((weatherForecastData.daily[2].temp.min) + (weatherForecastData.daily[2].temp.max)) / 2;
                    var day2Temp = ((avgDay2Temp) - 273.15) * 1.80 + 32;
                    var convertedDay2Temp = day2Temp.toFixed(2);
                    $("#tempDay2").html(convertedDay2Temp + "&#8457;");
                    var day2Humid = weatherForecastData.daily[2].humidity;
                    $("#humidDay2").html("Humidity: " + day2Humid + "%");

                    var weatherIcon3 = weatherForecastData.daily[3].weather[0].icon;
                    var iconurl3 = "http://openweathermap.org/img/wn/" + weatherIcon3 + ".png";
                    var newIcon3 = $('<img/>');
                    newIcon3.attr("src", iconurl3);
                    $("#weatherIconDay3").replaceWith(newIcon3);
                    var avgDay3Temp = ((weatherForecastData.daily[3].temp.min) + (weatherForecastData.daily[3].temp.max)) / 2;
                    var day3Temp = ((avgDay3Temp) - 273.15) * 1.80 + 32;
                    var convertedDay3Temp = day3Temp.toFixed(2);
                    $("#tempDay3").html(convertedDay3Temp + "&#8457;");
                    var day3Humid = weatherForecastData.daily[3].humidity;
                    $("#humidDay3").html("Humidity: " + day3Humid + "%");

                    var weatherIcon4 = weatherForecastData.daily[4].weather[0].icon;
                    var iconurl4 = "http://openweathermap.org/img/wn/" + weatherIcon4 + ".png";
                    var newIcon4 = $('<img/>');
                    newIcon4.attr("src", iconurl4);
                    $("#weatherIconDay4").replaceWith(newIcon4);
                    var avgDay4Temp = ((weatherForecastData.daily[4].temp.min) + (weatherForecastData.daily[4].temp.max)) / 2;
                    var day4Temp = ((avgDay4Temp) - 273.15) * 1.80 + 32;
                    var convertedDay4Temp = day4Temp.toFixed(2);
                    $("#tempDay4").html(convertedDay4Temp + "&#8457;");
                    var day4Humid = weatherForecastData.daily[4].humidity;
                    $("#humidDay4").html("Humidity: " + day4Humid + "%");

                    var weatherIcon5 = weatherForecastData.daily[5].weather[0].icon;
                    var iconurl5 = "http://openweathermap.org/img/wn/" + weatherIcon5 + ".png";
                    var newIcon5 = $('<img/>');
                    newIcon5.attr("src", iconurl5);
                    $("#weatherIconDay5").replaceWith(newIcon5);
                    var avgDay5Temp = ((weatherForecastData.daily[5].temp.min) + (weatherForecastData.daily[5].temp.max)) / 2;
                    var day5Temp = ((avgDay5Temp) - 273.15) * 1.80 + 32;
                    var convertedDay5Temp = day5Temp.toFixed(2);
                    $("#tempDay5").html(convertedDay5Temp + "&#8457;");
                    var day5Humid = weatherForecastData.daily[5].humidity;
                    $("#humidDay5").html("Humidity: " + day5Humid + "%");
                });
            }
        });
    };// --- end of function ajaxCallWeatherDataDisplay

    //Run function to be presented with the weather info
    ajaxCallWeatherDataDisplay();


}); // ------ END OF EVERYTHING