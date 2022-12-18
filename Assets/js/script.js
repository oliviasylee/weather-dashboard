let weatherFormEl = document.querySelector('#weather-form');
let cityNameInputEl = document.querySelector('#cityname');
let weatherContainerEl = document.querySelector('#weather-container');
let weatherSearchCity = document.querySelector('#weather-search-city');
let descriptionContainer = document.querySelector(".description");

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

// api로 불러온 데이터를 weather-container에 담기
// let displayWeather = function (searchTerm) {
//   weatherSearchCity.textContent = searchTerm;
//   $("#weather-search-city").html(data.name);
//   console.log(data.name);
// }

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

          // City name in card-body
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
          
          // icon은 object, {icon: '02n'}, object inside array
          // https://stackoverflow.com/questions/50822205/accessing-object-inside-array
          // 아이콘 주소를 html의 classname todayIcon에 붙여서 출력
          // 아 src값이 없기 때문에 null이 나오는구나 현재 src는 ... empty상태라?
          // 그럼 태그를 찾아서 거기에 iconurl만 넣어주기로 하자 -> 계속 null값이 나옴
          // 내 생각에 html에서 img src가 값이 없는 상태이기 때문에 그걸 불러와서 넣는다는 개념이 틀린 듯
          // 그래서 대안으로 아예 js로 img태그를 만들어서 url을 생성 후 타이틀 옆에 붙임

          let todayIcon = document.createElement('img');
          todayIcon.src = iconUrl;
          document.getElementById('cityTitle').appendChild(todayIcon);
          
          // Temp
          // need to add subtitle "Temp:" 
          // need to add for loop and p element?
          let descrList = document.createElement('p');
          descriptionContainer.appendChild(descrList)
      
        //   for (let i=0; i< data.hits[random].recipe.ingredientLines.length; i++) {
        //     var item = $("<li>")
        //     item.html(data.hits[random].recipe.ingredientLines[i]);
        //     list.append(item)
        // }

          // need a for loop -> 5days forecast
          let todayTemp = document.createElement('p');
          var todayTempNode = document.createTextNode(data.main.temp);
          console.log(todayTemp);
          todayTemp.appendChild(todayTempNode);
          descriptionContainer.appendChild(todayTemp);
          
          //todayTemp.html("<h5>Temp:</h5>") + data.main.temp;
          
          // Wind
          // add wind speed under temp
          let todayWind = document.createElement('p');
          var todayWindNode = document.createTextNode(data.wind.speed);
          todayWind.appendChild(todayWindNode);
          descriptionContainer.appendChild(todayWind);
          console.log(data.wind.speed);
          
          // Humidity: add humidity under '
          let todayHum = document.createElement('p');
          var todayHumNode = document.createTextNode(data.main.humidity);
          todayHum.appendChild(todayHumNode);
          descriptionContainer.appendChild(todayHum);
          console.log(data.main.humidity);

        });
      }}
    )};

weatherFormEl.addEventListener('submit', formSubmitHandler);