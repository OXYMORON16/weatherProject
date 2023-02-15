const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function(req, res){
    const cityName = req.body.cityName;
    console.log(cityName);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=bec2d564ff105c3ea7e30d1689ea686d&units=metric";
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
            const temp = weatherData.main.temp;
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + cityName + " is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })
})

app.listen(3000, function(){
    console.log('Listening on port 3000');
})