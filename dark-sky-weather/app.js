(function() {
    var DARKSKY_API_URL = 'https://api.darksky.net/forecast/'
    var DARKSKY_API_KEY = '48b6b6b75151fc7513664e14a802c6d1'
    var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

    var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
    var GOOGLE_MAPS_API_KEY = 'AIzaSyB6XhW-M9iWrTb5y_i6aAI9CaNJeILw718'

    function getCoordinatesForCity(cityName) {
        var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`
        return (
            fetch(url)
            .then(response => response.json())
            .then(data => data.results[0].geometry.location)
        )
    }

    function getCurrentWeather(coords) {
        var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat}, ${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`
        return (
            fetch(url)
            .then(response => response.json())
            .then(data => data.currently)
        )
    }

    var app = document.querySelector('#app')
    var cityForm = app.querySelector('.city-form')
    var cityInput = cityForm.querySelector('.city-input')
    var cityWeather = app.querySelector('.city-weather')

    cityForm.addEventListener('submit', function() {
        event.preventDefault()
        
        var city = cityInput.value
        cityWeather.innerText = `Loading weather for ${city.toUpperCase()}...`

        getCoordinatesForCity(city)
        .then(getCurrentWeather)
        .then(function(weather) {
            console.log(weather)
            cityWeather.innerText = `Current temperature: ${weather.temperature}`
            

            var weatherIcon = document.createElement('canvas')
            weatherIcon.id = 'city-weather-icon'
            weatherIcon.width = '128'
            weatherIcon.height = '128'
            cityWeather.appendChild(document.createElement('div'))
            cityWeather.querySelector('div').appendChild(weatherIcon)
            
            var skycons = new Skycons({"color": "skyblue"});
            skycons.add('city-weather-icon', weather.icon);
            skycons.play();      
        })
    })
})()