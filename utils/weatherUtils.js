const axios = require('axios').default

const getTemperature = (city, callback) => {
    console.log(city);
    axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: { q: city, appid: '7fe67bf08c80ded756e598d6f8fedaea', units: 'metric' },
    }).then(function({ data }) {

        callback({
            longitude: data.coord.lon,
            latitude: data.coord.lat,
            city: data.name,
            temp: data.main.temp,
            feels_like: data.main.feels_like
        }, undefined)
    }).catch(function(error) {
        callback(undefined, error)
    })
}

module.exports = {
    getTemperature
}