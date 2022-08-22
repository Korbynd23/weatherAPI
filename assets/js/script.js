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
                const {lat, lon} = data[0]
                currentDay(lat, lon)
                getFiveDayForecast(lat, lon)
            })

        })
}

function currentDay(lat, lon) {
    let requestWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={minutely,hourly,alerts}&appid=c3924722c03c1207da00ee288c3bfd63`

    fetch(requestWeatherUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var unixTimestamp = data.current.dt;
            var dateT = new Date(unixTimestamp * 1000);
            console.log(dateT.toLocaleDateString("en-US"));
            console.log(data)
            displayCurrent(data, dateT)
            displayForecast(dateT)
        })
}

function getFiveDayForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={minutely,hourly,alerts,current}&appid=c3924722c03c1207da00ee288c3bfd63`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data.daily.slice(0,5))
            var forcastData = data.daily.slice(0,5)
            displayForecast(forcastData)
        })
        // .catch((error) => console.error(error))
} 

function displayForecast(forcastData, dateT) {
    
    for (var i = 0; i < forcastData.length; i++) {
        console.log(forcastData[i]) 
        var forecastContainer = document.createElement("div")
        var listItemTemp = document.createElement("li")
        var listItemHum = document.createElement("li")
        var listItemWind = document.createElement("li")
        // var listItemDate = document.createElement("li")
        // listItemDate.textContent = dateT.toLocaleString("en-US");

        listItemWind.textContent = forcastData[i].wind_speed + " mph";
        listItemHum.textContent = forcastData[i].humidity  + "%";
        listItemTemp.textContent = forcastData[i].temp.day + "°F";
        
        // forecastList.append(listItemDate)
        forecastContainer.className = `card bg-light mb-5`
        forecastContainer.setAttribute("style", "max-width: 18rem;")  
        forecastContainer.append(listItemTemp, listItemHum, listItemWind)

        fiveDayEl.append(forecastContainer)   
    }     
}

function displayCurrent(data, dateT) {
    var dayContainer = document.createElement("div")
    // var cityName = document.createElement("div")
    var dateEl = document.createElement("h4")
    // var iconEl = document.createElement("img")
    var tempEl = document.createElement("li")
    var windEl = document.createElement("li")
    var humEl = document.createElement("li")
    var uvEl = document.createElement("li")
    // var iconEl = document.createElement("img")

    // cityName.textContent = cityInput;
    tempEl.textContent = data.current.temp + "°F";
    windEl.textContent = data.current.wind_speed + " mph";
    dateEl.textContent = dateT.toLocaleString("en-US");
    humEl.textContent = data.current.humidity + "%";
    uvEl.textContent = data.current.uvi;
    // iconEl.src = `http://openweathermap.org/img/wn/${data.daily.weather.icon}.png`

    dayContainer.append(dateEl);
    // dayContainer.append(iconEl);
    dayContainer.append(humEl);
    dayContainer.append(windEl);
    dayContainer.append(tempEl);

    currentDayDiv.append(dayContainer)
}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var cityInput = document.getElementById("cityType").value;
    if (cityInput === "")
        return;
    else {
        console.log("made it here")
        getCityApi(cityInput)
    }
})
