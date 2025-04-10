/* === Meet & Greet Banner === */
const banner = document.getElementById('meetGreetBanner');
const closeBannerButton = document.getElementById('closeBanner');
const today = new Date().getDay(); // Sunday=0, Monday=1, Tuesday=2, Wednesday=3, etc.
// Display banner only on Mon (1), Tue (2), and Wed (3)
if (today === 1 || today === 2 || today === 3) {
  banner.style.display = 'block';
} else {
  banner.style.display = 'none';
}
closeBannerButton.addEventListener('click', () => {
  banner.style.display = 'none';
});

/* === Spotlight Members === */
   const spotlightContainer = document.getElementById('spotlight-container');
   fetch('data/members.json')
     .then(response => response.json())
     .then(data => {
       // Assume the JSON data has a property "members" which is an array
       const eligible = data.members.filter(member => {
         const level = member.membership.toLowerCase();
         return level === 'silver' || level === 'gold';
       });
       // Randomly pick two or three spotlight members
       const numToShow = Math.min(eligible.length, 3);
       const shuffled = eligible.sort(() => 0.5 - Math.random());
       const selected = shuffled.slice(0, numToShow);
       selected.forEach(member => {
         const card = document.createElement('div');
         card.classList.add('spotlight-card');
         // Member name
         const nameEl = document.createElement('h3');
         nameEl.textContent = member.name;
         card.appendChild(nameEl);
         // Member image (if available)
         if (member.image) {
           const img = document.createElement('img');
           img.src = `images/${member.image}`; // Assumes images are stored in an "images" folder
           img.alt = member.name;
           card.appendChild(img);
         }
         // Website link
         const websiteEl = document.createElement('a');
         websiteEl.href = member.website;
         websiteEl.textContent = member.website;
         websiteEl.target = '_blank';
         card.appendChild(websiteEl);
         spotlightContainer.appendChild(card);
       });
     })
     .catch(error => console.error('Error fetching members data:', error));
 
// Replace with your actual OpenWeatherMap API key
const apiKey = 'bd5a95d7d72fe87d1f401fbb551029cb';

// Set your desired city (adjust as needed)
const city = 'Spanish Fork';

// Select HTML elements for current weather
const currentTempEl = document.getElementById('temp');
const weatherDescEl = document.getElementById('description');
const weatherIconEl = document.getElementById('weather-icon');
// Container for the forecast cards
const forecastContainer = document.getElementById('forecast-container');

// Construct API URLs for current weather and forecast
const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

// Function to display current weather data
function displayCurrentWeather(data) {
 const temp = Math.round(data.main.temp);
 const description = data.weather[0].description;
 const icon = data.weather[0].icon;

 currentTempEl.textContent = `${temp}°F`;
 weatherDescEl.textContent = description;
 weatherIconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
 weatherIconEl.alt = description;
}

// Function to display a 3-day forecast
function displayForecast(data) {
 // The forecast API returns data in 3-hour increments.
 // We'll pick one forecast per day around noon (12:00:00)
 const forecasts = {};
 data.list.forEach(item => {
   if (item.dt_txt.includes("12:00:00")) {
     // Extract the date portion (YYYY-MM-DD)
     const date = item.dt_txt.split(" ")[0];
     forecasts[date] = item;
   }
 });

 let count = 0;
 // Loop through forecast entries and create cards for up to 3 days
 for (let date in forecasts) {
   if (count >= 3) break;
   const forecast = forecasts[date];
   const card = document.createElement('div');
   card.classList.add('forecast-card');

   const dateEl = document.createElement('h4');
   dateEl.textContent = date;
   card.appendChild(dateEl);

   const tempEl = document.createElement('p');
   tempEl.textContent = `${Math.round(forecast.main.temp)}°F`;
   card.appendChild(tempEl);

   const descEl = document.createElement('p');
   descEl.textContent = forecast.weather[0].description;
   card.appendChild(descEl);

   forecastContainer.appendChild(card);
   count++;
 }
}

// Fetch and display current weather data
fetch(currentWeatherURL)
 .then(response => response.json())
 .then(data => {
   displayCurrentWeather(data);
 })
 .catch(error => console.error('Error fetching current weather:', error));

// Fetch and display the forecast data
fetch(forecastURL)
 .then(response => response.json())
 .then(data => {
   displayForecast(data);
 })
 .catch(error => console.error('Error fetching forecast data:', error));
