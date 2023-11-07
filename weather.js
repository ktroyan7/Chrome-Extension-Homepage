// Sets default location to New York
let lat = 40.73061;
let long = -73.935242;

function setExtensionWeather(
  locationName,
  locationCountry,
  locationTemp,
  weatherDescription,
  weatherIcon
) {
  // Set the HTML elements in the weather section to the arguments passed into the function
  document.getElementById('location').innerHTML = locationName;
  document.getElementById('temperature').innerHTML = locationTemp;
  document.getElementById('description').innerHTML = weatherDescription;
  document.getElementById('city').innerHTML = locationCountry;
  document.getElementById('weather-icon').setAttribute('src', imgUrl + weatherIcon);
}

// Gets the weather location of the browser or default weather location
function getWeatherLocation(position) {
  // Checks a position was passed into the function then replaces the default latitude and longitude if a position exists
  if (
    position !== undefined &&
    position?.coords?.latitude &&
    position?.coords?.longitude
  ) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
  }

  // API string using JavaScript template literals
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  
  const api = `${weatherDomain}?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=metric`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Extract the required data from the response
      const locationName = data.name;
      const locationCountry = data.sys?.country;
      const locationTemp = data.main?.temp;
      const weatherDescription = data.weather[0]?.description;
      const weatherIcon = `${data.weather[0]?.icon}.png`;

      // Invoke the function to set the weather with the required data
      setExtensionWeather(
        locationName,
        locationCountry,
        locationTemp,
        weatherDescription,
        weatherIcon
      );
    });
}

// First, make sure that the browser supports the geolocation API
if (navigator.geolocation) {
  console.log('geolocation function running');
  // If it does, invoke the getCurrentPosition function
  navigator.geolocation.getCurrentPosition(
    function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      // Get the weather for the geolocation
      getWeatherLocation(position);
      console.log('Latitude: ' + lat + ', Longitude: ' + long);
    },
    function (error) {
      console.log('Error obtaining location: ' + error.message);
      // Get the weather for the default location
      getWeatherLocation(undefined);
    }
  );
} else {
  // If the browser doesn't support the geolocation API, display an error message
  console.log('Geolocation is not supported by this browser.');
  // Get the weather for the default location
  getWeatherLocation(undefined);
}
