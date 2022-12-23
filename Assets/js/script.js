var weatherFormEl = document.querySelector('#weather-form');
var cityNameInputEl = document.querySelector('#cityname');
var descriptionContainer = document.querySelector(".description");
var currentWeatherEl = document.getElementById("currentWeather");
var fivedayEl = document.getElementById("fivedayWeather");
var searchEl = document.getElementById("search-button");
var cityEl = document.getElementById("enter-city");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

const key="1362316676e7462ce8cb9c952d85a52f"

var formSubmitHandler = function (event) {
  event.preventDefault();

  // Save searched city in local storage
  var cityName = cityNameInputEl.value.trim();
  getCityWeather(cityName);
  searchHistory.push(cityName);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  // renderSearchHistory();

  if (cityName) {
    getCityWeather(cityName);

    cityNameInputEl.value = '';
  } else {
    alert('Please enter a city!');
  }

};

function getCityWeather(city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city+ "&limit=5"+"&appid=" + key;
  console.log(apiUrl)

  fetch(apiUrl)
    .then(function (response){
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log(data.name);

          currentWeatherEl.classList.remove("d-none");

          // City name in card-body
          var cityTitle = document.querySelector("#cityTitle");
          cityTitle.innerText = data.name;
          
          // Date + Icon
          var todayDate = dayjs().format("dddd, MMMM D YYYY")
          cityTitle.innerHTML = data.name + " (" + todayDate + ") ";
        //  Another way to display Date 
        //  const dt = data.dt;
        //  var today = new Date(dt*1000);
        //  console.log(today.toDateString());
        //  cityTitle.append(today.toDateString());
        //  cityTitle.innerHTML = data.name + " (" + today.toDateString() + ") ";

          var iconUrl = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
          console.log(data.weather[0].icon);
          console.log(iconUrl);
          
          // icon is an object, {icon: '02n'}, object inside array
          var todayIcon = document.createElement('img');
          todayIcon.src = iconUrl;
          document.getElementById('cityTitle').appendChild(todayIcon);
          
          // Temp
          var idTemp = document.querySelector("#temperature");
          idTemp.innerHTML = "Temp: " + ((data.main.temp - 273.15) * 1.8 + 32).toFixed(1) + " &#176F";
          
          // Wind
          var idWind = document.querySelector("#wind-speed");
          idWind.innerHTML = "Wind: " + data.wind.speed + " MPH";
          console.log(data.wind.speed);
          
          // Humidity
          var idHum = document.querySelector("#humidity");
          idHum.innerHTML = "Humidity: " + data.main.humidity + "%";
          console.log(data.main.humidity);
        })
      }})
      
    // Parse response to display forecast for next 5 days
      var fiveDaysUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city+"&appid=" + key +"&cnt=5";
      console.log(fiveDaysUrl)
  
    fetch(fiveDaysUrl)
      .then(function (response){
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
        
            fivedayEl.classList.remove("d-none");
        
    // loop for 5-day forecast Date + icon, Temp, Wind, Humidity
        const forecastEls = document.querySelectorAll(".forecast");
        
    for (i = 0; i < forecastEls.length; i++) {
    forecastEls[i].innerHTML = "";

    var iconUrl = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
          var forecastWeatherEl = document.createElement('div');

          // 5-day Date
          const forecastDate = dayjs().add(i+1, 'day').format("dddd, MMMM D YYYY")
          var forecastDateDisplay = document.createElement('h5');
          forecastDateDisplay.textContent = forecastDate;
          forecastWeatherEl.append(forecastDateDisplay);

          // Icon
          var forecastIcon = document.createElement('img');
          forecastIcon.src = iconUrl;
          forecastWeatherEl.append(forecastIcon);

          // Temp
          var forecastTemp = document.createElement("p");
          forecastTemp.innerHTML = "Temp: " + ((data.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(1) + " &#176F";
          forecastWeatherEl.append(forecastTemp);

          // Wind
          var forecastWind = document.createElement("p");
          forecastWind.innerHTML = "Wind: " + data.list[i].wind.speed + " MPH";
          forecastWeatherEl.append(forecastWind);

          // Humidity
          var forecastHum = document.createElement("p");
          forecastHum.innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
          forecastWeatherEl.append(forecastHum);

          forecastEls[i].append(forecastWeatherEl);
    }
        })    
        }
        })

      


  };

weatherFormEl.addEventListener('submit', formSubmitHandler);