var searchBtn = document.getElementById("searchBtn")
var fiveDayEl = document.getElementById("fiveDay")
var currentDayDiv = document.getElementById("currentDay")

function getCityApi(cityInput) {
    console.log("my past data is " + cityInput)
    let param = cityInput
    localStorage.setItem("city", cityInput)
    //create button and get item from city input
    let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${param}&limit=1&appid=01c6acda042379425ee30a68789c29c5`
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json().then(function (data) {  
            console.log(data)
            lat = data[0].lat
            lon = data[0].lon
            currentDay(lat, lon)  
        })
        
    })
}

function currentDay(lat, lon) {
    let latOb = lat
    let lonOb = lon
    let requestWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latOb}&lon=${lonOb}&exclude={minutely,hourly,alerts}&appid=c3924722c03c1207da00ee288c3bfd63`
    
    fetch(requestWeatherUrl)
    .then(function (response) {
        return response.json()
    })
    .then (function(data) {
        var unixTimestamp = data.current.dt;
        var date = new Date(unixTimestamp * 1000);
        console.log(date.toLocaleDateString("en-US"));
        // fiveDay(data)
        displayData(data, date)
    })
    
}

function displayData(data) {
    var dayContainer = document.createElement("div")
    var cityName = document.createElement("div")
    var dateEl = document.createElement("h4")
    var iconEl =document.createElement("img")
    var tempEl = document.createElement("li")
    var windEl = document.createElement("li")
    var humEl = document.createElement("li")
    var uvEl = document.createElement("li")
}

// function fiveDay(data) {
    //     for (var i = 0; i < 5; i++) {
        //     }
        // }
        
        searchBtn.addEventListener("click", function(event) {
            event.preventDefault();
            var cityInput = document.getElementById("cityType").value;
            if (cityInput === "")
            return;
            else {
                console.log("made it here")
                getCityApi(cityInput)
            }
        })
// var wCity = data.city.name
// localStorage.setItem("savedCity", wCity)
// console.log(wCity)

// var wTemp = data.list[39].main.temp
// localStorage.setItem("savedTemp", wTemp)
// console.log(wTemp)

// var wSky = data.list[i].weather[0].main
// localStorage.setItem("savedSky", wSky)
// console.log(wSky)

// var wWind = data.list[i].wind.speed
// localStorage.setItem("savedWind", wWind)
// console.log(wWind)

// var wHum = data.list[i].main.humidity
// localStorage.setItem("savedHum", wHum)
// console.log(wHum)
