let element = (data) => document.querySelector(data);
let API_KEY = `eaa92d0dd4dfe047dd95baa27cfb37b6`;
let getGeoCord = (name) => {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((cord) => {
      try {
        const { name, lat, lon } = cord[0];
        element("#cityName").innerHTML = name;
        getWeatherData(lat, lon);
      } catch {
        alert("Spelling Error");
      }
    });
};
let getWeatherData = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      element("#temperature").innerHTML = data.main.temp;
      element("#maxTemperature").innerHTML = data.main.temp_max;
      element("#minTemperature").innerHTML = data.main.temp_min;
      element("#feelTemperature").innerHTML = data.main.feels_like;
      element("#windSpeed").innerHTML = data.wind.speed + " Km/H";
      element("#humidity").innerHTML = data.main.humidity + " %";
      element("#airPressure").innerHTML = data.main.pressure + " Pa";
      element("#seaLevel").innerHTML = data.main.sea_level;
    });
};
element("#button").addEventListener("click", () => {
  if (
    element("#input").value.length > 0 &&
    element("#input").value != element("#cityName").innerHTML
  )
    getGeoCord(element("#input").value);
});
