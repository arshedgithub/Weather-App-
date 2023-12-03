var APIKey = '71bc351b35dc6367546d9b2b2a711f68';

var display = document.getElementById('display');
var displayForecast = document.getElementById('forecast');

function displayCurrentWeather(){

    var city = cityname.value;

    // template string 
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    var http = new XMLHttpRequest();    
    http.open('GET', url);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.response)

            // destructuring 
            var { temp, pressure, humidity } = data.main

            var weather = data.weather[0].main;
            var weatherDescription = data.weather[0].description;
            
            // template string 
            display.innerHTML = `<div style="font-size: 25px; font-weight: bold">${weather}</div><div>${weatherDescription}</div><br><div>Temperature :  ${temp} K</div><div>Humidity : ${humidity}</div><div>Pressure : ${pressure}</div>`
            
        } else if (http.status == 404){
            var error = JSON.parse(http.response).message;
            alert(error);
        }
    }
    displayWeatherForecast();
}  

function displayWeatherForecast(){
    var city = cityname.value;

    // template string 
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    var http = new XMLHttpRequest();    
    http.open('GET', forecastUrl);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.response);

            console.log(data);
            displayForecast.innerHTML = '';

            for (let i = 0; i <= 10; i++) {
                var { main: weather, description } = data.list[i].weather[0];
                var { temp, pressure, humidity} = data.list[i].main;
                var date = data.list[i].dt_txt;
                
                displayForecast.innerHTML += `<div class="card"><br><div>${date}</div><br><div style="font-size: 25px; font-weight: bold">${weather}</div><div>${description}</div><br><div>${temp} K</div><div>Humidity : ${humidity}</div><div>Pressure : ${pressure}</div><br></div>`
            
            }
            
        }
    }
}  
