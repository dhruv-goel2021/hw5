// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)

  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event) {
    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location
    let locationInput = document.querySelector(`#location`)
    let forecastDaysInput  = document.querySelector(`#days`)
    // - Get the user-entered location from the element's value
    let location = locationInput.value
    let forecastDays = forecastDaysInput.value
    // - Check to see if the user entered anything; if so:
    if (location.length > 0 && forecastDays>0) {
      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=4cdeffb1df8a45859e5165937212804&q=${location}&days=${forecastDays}`

      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      console.log(json)

      // - Store the returned location, current weather conditions, the forecast as three separate variables
      let interpretedLocation = json.location
      let currentWeather = json.current
      let dailyForecast = json.forecast

      // Store a reference to the "current" element
      let currentElement = document.querySelector(`.current`)

      // Fill the current element with the location and current weather conditions
      currentElement.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
          <div class="font-bold">
            <img src='http:${currentWeather.condition.icon}' class="inline-block">
            <span class="temperature">${currentWeather.temp_f}</span>° 
            and
            <span class="conditions">${currentWeather.condition.text}</span>
          </div>
        </div>
      `
    
//create a loop for the forecasts

for (let i = 0; i< dailyForecast.legnth; i++) {

//create variables for each forecast type

  let forecastDate = dailyForecast[i].forecastday.date
  let minTemp = dailyForecast[i].forecastday.day.mintemp_f
  let maxTemp = dailyForecast[i].forecastday.day.maxtemp_f
  let condition = dailyForecast[i].forecastday.day.condition.text
  let conditionPic = dailyForecast[i].forecastday.day.condition.icon


// Create a variable for the HTML element we're going to add to
let currentElement = document.querySelector(`.forecast`)
// Insert HTML into the products element, using the data from each product
currentElement.innerHTML = `
<div class="text-center space-y-8">
        <div class="font-bold text-3xl">3 Day Forecast</div>
        <div>
          <img src='https:${conditionPic}' class="mx-auto">
          <h1 class="text-2xl text-bold text-gray-500">${forecastDate}</h1>
          <h2 class="text-xl">High ${maxTemp}° – Low ${minTemp}</h2>
          <p class="text-gray-500">${condition}</h1>
        </div>

      </div>`

}
}
  })
})