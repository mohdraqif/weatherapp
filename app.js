const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) =>{
  res.render('hello')
})
app.get('/about', (req, res) =>{
  res.render('about')
})
app.get('/entry', (req, res) =>{
  res.render('entry')
})
app.get('/weather', (req, res) =>{                                    /////////////////////////////////////
  if(!req.query.address) {                                            //  Uses:                          //
    res.send('You Must Provide An Address')                           //    weather?adress=delhi/        //
  } else {                                                            //                                 //
    geocode(req.query.address, (error, data) =>{                      //  Returns:                       //
      if(error) {                                                     //    Latitude: latitude of delhi  //
        return res.send('NOT CONNECTED!!!')                           //    Longitude:latitude of delhi  //
      }                                                               //    Location: location of delhi  //
        // console.log(data)                                          //                                 //
        res.send(data)                                                //   to blank url /weather         //
      })                                                              /////////////////////////////////////
    }
}) 

app.post('/weather', (req, res) =>{
  var loc = req.body.location
  var location = loc.toUpperCase();
    fetch('http://localhost:3000/weather?address='+ location).then((response) =>{
      response.json().then((data) =>{
        // console.log(data.longitude,data.latitude,data.location)
         
            forecast(data.latitude,data.longitude, (error, data) =>{
              // console.log(data);

          return res.render('weather', {
            longitude: data.longitude, latitude: data.latitude,
            summary: data.summary, humidity: data.humidity,
            rainfall: data.rainfall, location: location, clouds: data.clouds
          })
       })
    })
  });
})
app.get('*', (req, res) =>{
  res.render('404')
})

app.listen(port, () =>{
  console.log('SERVER IS ACTIVE')
})