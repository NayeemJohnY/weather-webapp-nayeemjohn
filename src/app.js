const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getTemperature = require('../utils/weatherUtils').getTemperature


const port = process.env.PORT || 3000
app = express();
const assetsDirectoryPath = path.join(__dirname, '../assets')
const partialsPath = path.join(__dirname, '../views/partials')

// Setup static directory to serve
hbs.registerPartials(partialsPath)
app.use(express.static(assetsDirectoryPath))


app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/weather', (req, res) => {
    res.render('weather')
})

app.get("/api/weather", (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'You must provide an city!'
        })
    }
    getTemperature(req.query.city, (data = {}, error) => {
        if (error) {
            return res.send({ error: "Error while fetching temperature :" + error });
        }
        console.log("The Weather Data of city : " + req.query.city + " is: ", data);
        res.send({
            city: data.city,
            longitude: data.longitude,
            latitude: data.latitude,
            temperature: data.temp + " °C",
            feels_like: data.feels_like + " °C",
        })
    })
})


app.listen(port, () => {
    console.log("Weather App is started & running on port " + port);
})