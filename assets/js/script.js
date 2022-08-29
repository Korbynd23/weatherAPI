var searchBtn = document.getElementById("searchBtn")
var fiveDayEl = document.getElementById("fiveDay")
var currentDayDiv = document.getElementById("currentDay")
var prevCity = document.getElementById("prevCity")
var cityInput = document.getElementById("cityType")

if(localStorage.getItem('city')) {
    var localCities = localStorage.getItem('city')
    var savedCities = localCities.split(',')
  } else {
    var savedCities = [];
  }

function getCityApi(cityInput, element) {
    let param = cityInput || element
    localStorage.setItem("city", cityInput)
    let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${param}&limit=1&appid=01c6acda042379425ee30a68789c29c5`


    fetch(requestUrl)
        .then(function (response) {
            return response.json().then(function (data) {
                const { lat, lon } = data[0]
                currentDay(lat, lon, param)
                getFiveDayForecast(lat, lon)
            })
        })
}

function currentDay(lat, lon, param) {
    let requestWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={minutely,hourly,alerts}&appid=c3924722c03c1207da00ee288c3bfd63`

    fetch(requestWeatherUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var unixTimestamp = data.current.dt;
            var dateT = new Date(unixTimestamp * 1000);
            displayCurrent(data, dateT, param)
        })
}

function getFiveDayForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={minutely,hourly,alerts,current}&appid=c3924722c03c1207da00ee288c3bfd63`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var forcastData = data.daily.slice(0, 5)
            displayForecast(forcastData)
        })
}

function displayForecast(forcastData) {
    fiveDayEl.innerHTML = ''
    
    for (var i = 0; i < 5; i++) {
        
        let forecastContainer = document.createElement("div")
        var listIcon = document.createElement("img")
        var listItemTemp = document.createElement("p")
        var listItemHum = document.createElement("p")
        var listItemWind = document.createElement("p")
        var listItemDate = document.createElement("h5")
        
        let dateFive = forcastData[i].dt
        let newDateFive = new Date(dateFive * 1000);
        const bestDate = newDateFive.toLocaleDateString("en-US")
        
        listItemDate.textContent = bestDate
        listItemWind.textContent = forcastData[i].wind_speed + " mph";
        listItemHum.textContent = "Humidity: " + forcastData[i].humidity + "%";
        listItemTemp.textContent = forcastData[i].temp.day + "°F";
        listIcon.src = `https://openweathermap.org/img/w/${forcastData[i].weather[0].icon}.png`
        
        forecastContainer.append(listItemDate, listIcon, listItemTemp, listItemHum, listItemWind)
        
        forecastContainer.className = `col bg-primary text-white ml-3 mb-3 rounded forecast fiveCardShadow`;
        forecastContainer.setAttribute("style", "width: 175px;", "height: 100px;")
        
        fiveDayEl.append(forecastContainer)        
    };
}

function displayCurrent(data, dateT, param) {
    currentDayDiv.innerHTML = ''

    var dayContainer = document.createElement("div")
    var dateEl = document.createElement("h4")
    var iconEl = document.createElement("img")
    var tempEl = document.createElement("li")
    var windEl = document.createElement("li")
    var humEl = document.createElement("li")
    var uvEl = document.createElement("li")
    var iconEl = document.createElement(`img`)

    tempEl.innerHTML = data.current.temp + "°F";
    windEl.innerHTML = data.current.wind_speed + " mph";
    dateEl.innerHTML = param + " " + dateT.toLocaleDateString("en-US");
    humEl.innerHTML = "Humidity: " + data.current.humidity + "%";
    uvEl.innerHTML = "UV Index: " + data.current.uvi;
    iconEl.src = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`

    dayContainer.append(dateEl, iconEl, tempEl, humEl, windEl, uvEl);

    currentDayDiv.append(dayContainer)

    if (uvEl.textContent <= 2) {
        uvEl.classList.add("bg-success")
      } else if (uvEl.textContent > 2 && uvEl.textContent <= 5) {
        uvEl.classList.add("bg-warning")
      } else if (uvEl.textContent > 5) {
        uvEl.classList.add("bg-danger")
      }  
}

function cityButtons() {
    var cityString = localStorage.getItem("city")
    var cityArray = cityString.split(",")
    cityArray.forEach(element => {
        const cityBtn = document.createElement("button")
        cityBtn.textContent = element
        prevCity.append(cityBtn)
        cityBtn.addEventListener("click", function (event){
            getCityApi(element)
        })
    })};


searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var cityInput = document.getElementById("cityType").value;
    if (cityInput === "")
        return;
    else {
        getCityApi(cityInput)
        savedCities.push(cityInput)
        localStorage.setItem("city", savedCities)
    }
})

cityButtons()