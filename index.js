const express = require("express")
const path = require("path")
const app = express()
var weather = require('openweather-apis')
const cookieParser = require('cookie-parser');
weather.setLang('en')

// Use the cookie parser middleware
app.use(cookieParser());

app.use(express.urlencoded({extended:false}))

// weather.setCoordinate(50.0467656, 20.0048731)
// weather.setCity('Belagavi')
weather.setUnits('metric')
//Place it here as shown
var ownKey = 'Add Your Api Key Here' //Add Your API Key Here
//This API Key will not work as i have already removed
//How to Get the Api key is shown in the vedio

weather.setAPPID(ownKey)

port = 4001

const public = path.join(__dirname,"public")
app.use(express.static(public))

app.set("view engine","hbs")
app.get("/",(req,res) => {
    const latitude = req.cookies.latitude;
    const longitude = req.cookies.longitude;

    weather.setCoordinate(latitude, longitude)
    weather.getAllWeather(function(err, JSONObj){
        res.render("index",{
            list:JSONObj
        })
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})