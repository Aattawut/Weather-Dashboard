let apiKey = "3ac0d8db34de82819d13a9167239acc1";
let searchBtn = $(".searchBtn");
let searchInput = $(".searchInput");
let searchHistory = [];

let cityNameEl = $(".cityName");
let currentDateEl = $(".currentDate");
let weatherIconEl = $(".weatherIcon")
let tempEl = $(".temp");
let humidityEl = $(".humidity");
let windSpeedEl = $(".windSpeed");
let uvIndexEl = $(".uvIndex");

var today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

var today = mm + '/' + dd + '/' + yyyy;


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
        let cityObj = {
            cityName: weatherData.name,
            cityTemp: weatherData.main.temp,
            cityHumidity: weatherData.main.humidity,
            cityWindSpeed: weatherData.wind.speed
        }
        renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed)
    });
});

function renderWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed) {
    cityNameEl.text(cityName)
    currentDateEl.text(`(${today})`)
    tempEl.text(cityTemp);
    humidityEl.text(cityHumidity);
    windSpeedEl.text(cityWindSpeed);
}


