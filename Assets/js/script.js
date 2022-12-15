var weatherFormEl = document.querySelector('#weather-form');
var cityNameInputEl = document.querySelector('#cityname');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchCity = document.querySelector('#weather-search-city');
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

          console.log(data.name);
          
          // data.name을 weather-search-city에 표시되게 하고 싶음
          weatherSearchCity.innerText = data.name;

          // card-body안에
          // 도시이름
          let cityTitle = document.querySelector("#cityTitle");
          cityTitle.innerText = data.name;
          
          // Date + Icon
          const dt = data.dt;
          let today = new Date(dt*1000);
          console.log(today.toDateString());
          cityTitle.append(today.toDateString());
          
          let iconUrl = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
          console.log(data.weather[0].icon);
          console.log(iconUrl);
          
          // 여기서 부터 다시하기
          // 불러온 아이콘을 타이틀 옆에 넣기
          // 아이콘 주소를 html의 classname todayIcon에 붙여서 출력
          let todayIcon = document.querySelector(".todayIcon");
          todayIcon.attr("src", iconUrl);


          // icon은 object, {icon: '02n'}, object inside array
          // https://stackoverflow.com/questions/50822205/accessing-object-inside-array

          // Temp
          let todayTemp = document.querySelector(".description");
          todayTemp.innerText = data.main.temp;
          // temp라는 작은 타이틀을 고정으로 달아주고 싶은데? 
          //todayTemp.html("<h5>Temp:</h5>") + data.main.temp;
          
          // Wind
          // Humidity

        });
      }}
    )};

// api로 불러온 데이터를 weather-container에 담기

// let displayWeather = function (searchTerm) {
//   weatherSearchCity.textContent = searchTerm;
//   $("#weather-search-city").html(data.name);
//   console.log(data.name);
  
// }

weatherFormEl.addEventListener('submit', formSubmitHandler);