weatherForm = document.querySelector('form')
city = document.querySelector('input[name="city"]')
weatherInfo = document.querySelector('p[id="weatherInfo"]')
weatherError = document.querySelector('p[id="weatherError"]')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    weatherInfo.textContent = 'Loading...'
    weatherError.textContent = ''
    console.log("Input City : ", city.value);
    fetch("/api/weather?city=" + city.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                console.log("Error: " + data.error);
                weatherError.textContent = data.error;
                weatherInfo.textContent = ''
            } else {
                console.log("Weather Data :", data);
                var weather_data = "<p><b>Weather Information for the City :</b></p><br>"
                for (var property in data) {
                    key = (property.charAt(0).toUpperCase() + property.slice(1)).replace("_", " ")
                    value = data[property]
                    weather_data += "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
                }
                weatherInfo.innerHTML = "<table>" + weather_data + "</table>"
            }
        }).catch(err => {
            console.log(err);
            weatherInfo.textContent = ''
            weatherError.textContent = err.message
        })
    })
})