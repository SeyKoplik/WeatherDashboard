$(document).ready(function () {
    //posted date on current city
    var datePosted = moment().format('MMMM Do, YYYY');
    $("#dateToday").text(datePosted);
    

    //pseudocode the weather forecast
    //openinging web browser I am taken to default layout
    //when I enter a city in search bar and click submit 
    // The city name is added on the lines below and can be clicked to do the same things here

    //I am presented with the following information
        // City name posted
        // City temperature posted
        // City Wind Speed Posted
        // City UV index
        // city's 5 day forecast is posted
                    //five day forcast include
                    //day following whatever TODAY is
                    // post 2 days after
                    // post 3 days after
                    // post 4 days after
                    // post 5 days after
    // When I click on the cities that was added in search... I can do the same thing as the others
    // When I refresh the page, all the information is saved in local storage so I can click again





});