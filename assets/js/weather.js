let apiKey = "3ac0d8db34de82819d13a9167239acc1";
let searchBtn = $(".searchBtn");
let searchInput = $(".searchInput");

// Left column locations
let cityNameEl = $(".cityName");
let currentDateEl = $(".currentDate");
let weatherIconEl = $(".weatherIcon");
let searchHistoryEl = $(".historyItems");

// Right column locations
let tempEl = $(".temp");
let humidityEl = $(".humidity");
let windSpeedEl = $(".windSpeed");
let uvIndexEl = $(".uvIndex");

let cardRow = $(".card-row");


// Create a current date variable
var today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
var today = mm + '/' + dd + '/' + yyyy;

let searchHistoryArr = [];


searchBtn.on("click", function(e) {
    e.preventDefault();
    console.log("clicked button")

    getWeather();
});

function renderWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon) {
    cityNameEl.text(cityName)
    currentDateEl.text(`(${today})`)
    tempEl.text(`Temperature: ${cityTemp} °F`);
    humidityEl.text(`Humidity: ${cityHumidity}%`);
    windSpeedEl.text(`Wind Speed: ${cityWindSpeed} MPH`);
    uvIndexEl.text();
    weatherIconEl.attr("src", cityWeatherIcon);
}

function renderSearchHistory(cityName) {
    // debugger;
    let newListItem = $("<li>").attr("class", "historyEntry");
    for(let i = 0; i < searchHistoryArr.length; i++) {
        newListItem.text(searchHistoryArr[i]);
        searchHistoryEl.prepend(newListItem);
    }
}

function getWeather() {
    let citySearchValue = searchInput.val();
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchValue}&APPID=${apiKey}&units=imperial`;
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(weatherData) {
        let cityObj = {
            cityName: weatherData.name,
            cityTemp: weatherData.main.temp,
            cityHumidity: weatherData.main.humidity,
            cityWindSpeed: weatherData.wind.speed,
            // cityUVIndex: weatherData.
            cityWeatherIconName: weatherData.weather[0].icon
        }
        // Keeps user from adding the same city to the searchHistory array list more than once
        if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
            searchHistoryArr.push(cityObj.cityName);
            let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
            renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon);
            renderSearchHistory(cityObj.cityName);
        }else{
            console.log("City already in searchHistory. Not adding to history list")
            let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
            renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon);
        }
    });
    getFiveDayForecast();

    function getFiveDayForecast() {
        cardRow.empty();
        let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearchValue}&APPID=${apiKey}&units=imperial`;
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
        .then(function(fiveDayReponse) {
            for (let i = 0; i != fiveDayReponse.list.length; i+=8 ) {
                let cityObj = {
                    date: fiveDayReponse.list[i].dt_txt,
                    icon: fiveDayReponse.list[i].weather[0].icon,
                    temp: fiveDayReponse.list[i].main.temp,
                    humidity: fiveDayReponse.list[i].main.humidity
                }
                let dateStr = cityObj.date;
                let trimmedDate = dateStr.substring(0, 10); 
                let weatherIco = `https:///openweathermap.org/img/w/${cityObj.icon}.png`;
                createForecastCard(trimmedDate, weatherIco, cityObj.temp, cityObj.humidity);
            }
        })
    }   
}

function createForecastCard(date, icon, temp, humidity) {

        // HTML elements we will create to later
    let fiveDayCardEl = $("<div>").attr("class", "five-day-card");
    let cardDate = $("<h3>").attr("class", "card-text");
    let cardIcon = $("<img>").attr("class", "weatherIcon");
    let cardTemp = $("<p>").attr("class", "card-text");
    let cardHumidity = $("<p>").attr("class", "card-text");

    cardRow.append(fiveDayCardEl);
    cardDate.text(date);
    cardIcon.attr("src", icon);
    cardTemp.text(`Temp: ${temp} °F`);
    cardHumidity.text(`Humidity: ${humidity}%`);
    fiveDayCardEl.append(cardDate, cardIcon, cardTemp, cardHumidity);
}


