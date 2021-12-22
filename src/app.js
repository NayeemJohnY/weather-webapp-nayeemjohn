const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getLocation = require('../utils/weatherUtils').getLocation
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
    getLocation(req.query.city, ({ latitude, longitude, city } = {}, error) => {
        if (error) {
            return res.send({ error: "Error while fetching location :" + error });
        }
        console.log("The latitude : " + latitude + ", and longitude : " + longitude + ", of city : " + city);
        getTemperature(latitude, longitude, city, ({ city, temp } = {}, error) => {
            if (error) {
                return res.send({ error: "Error while fetching temperature :" + error });
            }
            console.log("The Temperature is city : " + city + " is: ", temp);
            res.send({
                city: city,
                temp: temp
            })
        })
    })
})


app.listen(port, () => {
    console.log("Weather App is started & running on port " + port);
})