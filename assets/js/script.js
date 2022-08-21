var searchBtn = document.getElementById("searchBtn")
var array1 = [0,10,20,30,40]
var fiveDayEl = document.getElementById("fiveDay")

function getWeatherApi(cityInput) {
    console.log("my past data is " + cityInput)
    
    let param = cityInput
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${param}&units=imperial&appid=01c6acda042379425ee30a68789c29c5`
    //create a var param for input city^^
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json().then(function (data) {  
        fiveDay(data)  
        })
    
    })
}

function fiveDay(data) {
    for (var i = 0; i < 1; i++) {
        console.log(data.list[0])
        console.log(data.list[10])
        console.log(data.list[20])
        console.log(data.list[30])
        console.log(data.list[39])
        
        var wTemp = data.list[39].main.temp
        localStorage.setItem("savedTemp", wTemp)
        console.log(wTemp)
    }
}


searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var cityInput = document.getElementById("cityType").value;
    if (cityInput === "")
    return;
    else {
        console.log("made it here")
        getWeatherApi(cityInput)
    }
})
// var wCity = data.city.name
// localStorage.setItem("savedCity", wCity)
// console.log(wCity)


// var wSky = data.list[i].weather[0].main
// localStorage.setItem("savedSky", wSky)
// console.log(wSky)

// var wWind = data.list[i].wind.speed
// localStorage.setItem("savedWind", wWind)
// console.log(wWind)

// var wHum = data.list[i].main.humidity
// localStorage.setItem("savedHum", wHum)
// console.log(wHum)

// var unixTimestamp = data.list[0].dt;
// var date = new Date(unixTimestamp * 1000);
// console.log(date.toLocaleDateString("en-US"));