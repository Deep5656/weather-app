const { response } = require('express');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post('/', function (req, res) {

    const query = req.body.cityName;
    const apiKey = "c4cad1e36d4e04c21037b5df29915e18";
    const unit = "matrics"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on('data', function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = ' http://openweathermap.org/img/wn/' + icon + '@2x.png'
            res.write('<h1>the temprature in '+query+' is ' + temp + ' farenhite </h1>');
            res.write('currently weather in '+query+' is ' + weatherDiscription);
            res.write("<img src=" + imageUrl + ">")
            res.send();

        })
    })



})

app.listen(3000, function () {
    console.log('server is running at port 3000');
})