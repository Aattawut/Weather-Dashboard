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

// HTML elements we will append to later

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

    let citySearchValue = searchInput.val();
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchValue}&APPID=${apiKey}&units=imperial`;
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(weatherData) {
        console.log(weatherData);
        searchHistoryArr.push(citySearchValue);
        let cityObj = {
            cityName: weatherData.name,
            cityTemp: weatherData.main.temp,
            cityHumidity: weatherData.main.humidity,
            cityWindSpeed: weatherData.wind.speed,
            // cityUVIndex: weatherData.
            cityWeatherIconName: weatherData.weather[0].icon
        }

        let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
        renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon);
        renderSearchHistory(cityObj.cityName);
    });
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


