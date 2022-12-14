var weatherFormEl = document.querySelector('#weather-form');
var cityNameInputEl = document.querySelector('#cityname');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');
const key="1362316676e7462ce8cb9c952d85a52f"

//const apiUrl='https://api.openweathermap.org/data/2.5/weather?q=' + city+ '&appid=' + key';

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

// let displayWeather = function ()

// function getCityWeather(city) {
//   fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city+ '&limit=5'+'&appid=' + key)
//   console.log(recipeUrl)
//   .then(function(resp) {
//       return resp.json() 
//   })
//   .then(function(data) {
//       console.log('--->'+(JSON.stringify(data)));
//       drawWeather(data);
//   })
//   .catch(function() {
//       // catch any errors
//   });
// }


//Event Listeners on button click
document.addEventListener("DOMContentLoaded", () => {
  // Handling button click
  document.querySelector(".btn").addEventListener("click", () => {
      const searchedCity = document.querySelector('.form-input');
      console.log(searchedCity.value);
      if(searchedCity.value){
        getCityWeather(searchedCity.value);
      }       
 }) 
});

weatherFormEl.addEventListener('submit', formSubmitHandler);

// var getCityWeather = function (city) {
//   var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city+ '&appid=' + key+'';

//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data);
//           displayRepos(data, city);
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
// };

// var getFeaturedRepos = function (language) {
//   var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         displayRepos(data.items, language);
//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };

// var displayRepos = function (repos, searchTerm) {
//   if (repos.length === 0) {
//     weatherContainerEl.textContent = 'No repositories found.';
//     return;
//   }

//   repoSearchTerm.textContent = searchTerm;

//   for (var i = 0; i < repos.length; i++) {
//     var repoName = repos[i].owner.login + '/' + repos[i].name;

//     var repoEl = document.createElement('a');
//     repoEl.classList = 'list-item flex-row justify-space-between align-center';
//     repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

//     var titleEl = document.createElement('span');
//     titleEl.textContent = repoName;

//     repoEl.appendChild(titleEl);

//     var statusEl = document.createElement('span');
//     statusEl.classList = 'flex-row align-center';

//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     repoEl.appendChild(statusEl);

//     weatherContainerEl.appendChild(repoEl);
//   }
// };

//weatherFormEl.addEventListener('submit', formSubmitHandler);
//languageButtonsEl.addEventListener('click', buttonClickHandler);