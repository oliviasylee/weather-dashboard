var weatherFormEl = document.querySelector('#weather-form');
var cityNameInputEl = document.querySelector('#cityname');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchCity = document.querySelector('#weather-search-term');
const key="1362316676e7462ce8cb9c952d85a52f"

let formSubmitHandler = function (event) {
  event.preventDefault();

  let cityName = cityNameInputEl.value.trim();

  if (cityName) {
    getCityWeather(cityName);

    weatherContainerEl.textContent = '';
    cityNameInputEl.value = '';
  } else {
    alert('Please enter a city!');
  }
};

// //Event Listeners on button click
// document.addEventListener("DOMContentLoaded", () => {
//   // Handling button click
//   document.querySelector(".btn").addEventListener("click", () => {
//       const searchedCity = document.querySelector('.form-input');
//       console.log(searchedCity.value);
//       if(searchedCity.value){
//         getCityWeather(searchedCity.value);
//       }       
//  }) 
// });

let getCityWeather = function (city) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city+ "&limit=5"+"&appid=" + key;
  console.log(apiUrl)

  fetch(apiUrl)
    .then(function (response){
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);

        });
      }}
    )};

let displayWeather = function (searchTerm) {
  weatherSearchCity.textContent = searchTerm;
  
  
}

weatherFormEl.addEventListener('submit', formSubmitHandler);