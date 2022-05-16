const express = require("express");
const https = require("https");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const location = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  https.get(url, (response) => {
    response.on("data", function (data) {
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var weatherDesc = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(`<h1>Temp in ${location} is : ${temp}</h1>`);
      res.write(
        `<p>The weather is currently <strong>${weatherDesc}</strong>.</p>`
      );
      res.write(`<img src=${imageURL}>`);
      res.send();
    });
  });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
