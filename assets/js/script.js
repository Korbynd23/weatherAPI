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
                const { lat, lon } = data[0]
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
            console.log(data)
            displayCurrent(data, dateT)
        })
}

function getFiveDayForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={minutely,hourly,alerts,current}&appid=c3924722c03c1207da00ee288c3bfd63`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            console.log(data.daily.slice(0, 5))
            var forcastData = data.daily.slice(0, 5)
            displayForecast(forcastData)
        })
        
        
    }


function displayForecast(forcastData) {
    
    for (var i = 0; i < forcastData.length; i++) {
        
                var forecastContainer = document.createElement("div")
                var forecastContainer = document.createElement("div")
                var listIcon = document.createElement("img")
                var listItemTemp = document.createElement("p")
                var listItemHum = document.createElement("p")
                var listItemWind = document.createElement("p")
                var listItemDate = document.createElement("h5")
                
                let dateFive = forcastData[i].dt
                let newDateFive = new Date(dateFive * 1000);
                const bestDate = newDateFive.toLocaleDateString("en-US")
                
                listItemDate.innerHTML = bestDate
                listItemWind.innerHTML = forcastData[i].wind_speed + " mph";
                listItemHum.innerHTML = forcastData[i].humidity + "%";
                listItemTemp.innerHTML = forcastData[i].temp.day + "°F";
                listIcon.src = `https://openweathermap.org/img/w/${forcastData[i].weather[0].icon}.png`
                
                forecastContainer.append(listItemDate, listIcon, listItemTemp, listItemHum, listItemWind)
                
                forecastContainer.className = `col bg-primary text-white ml-3 mb-3 rounded forecast`;
                forecastContainer.setAttribute("style", "width: 175px;", "height: 100px;")
                
                fiveDayEl.append(forecastContainer)
            }
}

function displayCurrent(data, dateT) {
    var dayContainer = document.createElement("div")
    // var cityName = document.createElement("div")
    var dateEl = document.createElement("h4")
    var iconEl = document.createElement("img")
    var tempEl = document.createElement("li")
    var windEl = document.createElement("li")
    var humEl = document.createElement("li")
    var uvEl = document.createElement("li")
    var iconEl = document.createElement(`img`)

    // cityName.textContent = cityInput;
    tempEl.textContent = data.current.temp + "°F";
    windEl.textContent = data.current.wind_speed + " mph";
    dateEl.textContent = dateT.toLocaleString("en-US");
    humEl.textContent = data.current.humidity + "%";
    uvEl.textContent = data.current.uvi;
    iconEl.src = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`

    dayContainer.append(dateEl, iconEl, tempEl, humEl, windEl, uvEl);

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
        // localStorage.setItem("city", cityInput)
    }
})

