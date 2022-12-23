const message = document.querySelector(".message");
const cityInput = document.querySelector(".city-name");
const cursor = document.querySelector(".cursor");
const newsQuery = document.querySelector(".news-query");
const country = document.querySelector(".country");
const news = document.querySelector(".news-data");
const weatherDataFeild = document.querySelector(".data-field");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

function newsGet() {
  fetch(
    `https://newsapi.org/v2/top-headlines?country=${country.value}&q=${newsQuery.value}&apiKey=${key.news}`
  )
    .then((res) => res.json())
    .then((data) => updateNews(data));
}

function weatherGet() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${key.weather}`
  )
    .then((res) => res.json())
    .then((data) => updateWeather(data, 0))
    .catch((err) => updateWeather(null, 1));
}

function updateNews(data) {
  document.querySelector(".country-head").innerHTML = ` ${country.value}`;
  var content = "";
  data.articles.forEach((article) => {
    content += `
        <div class="news-card">
          <a target="_blank" class="news-headline" href="${article.url}">
          <h3>${article.title}</h3>
          </a>
          <p class="news-content">${article.description}</p>
        </div>
    `;
  });
  news.innerHTML = content;
}

function updateWeather(weatherData, err) {
  if (err) {
    weatherDataFeild.innerHTML = `<p>Sorry nothing found for<b>${cityInput.value}</b>.</p><p>Try changing the query.</p>`;
  }
  weatherDataFeild.innerHTML = `
      <h2>${weatherData.name}</h2>
      <h2>${weatherData.main.temp}°C</h2> <hr/>
      <p>${weatherData.weather[0].main || ""}</p>
      <p>Feels like ${weatherData.main.feels_like}°C</p>
      <p>High: ${weatherData.main.temp_max}°C</p>
      <p>Low: ${weatherData.main.temp_min}°C</p>
      <p>Humidity: ${weatherData.main.humidity}%</p>
      <p>Pressure: ${weatherData.main.pressure}hPa</p>
      `;
}

cityInput.addEventListener("change", weatherGet);
country.addEventListener("change", newsGet);
newsQuery.addEventListener("change", newsGet);

newsGet();
weatherGet();
