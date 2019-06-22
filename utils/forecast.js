const request = require('request');

const forecast = (latitude, longitude, callback) =>{
const skyurl = 'https://api.darksky.net/forecast/487074095d0c3d7caaf82d03b47f31fe/'+ latitude + ',' + longitude +'';

  request({ url: skyurl, json: true}, (error, response) =>{
    if(error) {
      callback('Not connected to internet!!!', undefined);
    } else if(response.body.error) {
      callback('No data. Try another search!!!' ,undefined)
    } else {
      callback(undefined, {
        'latitude': response.body.latitude,
        'longitude': response.body.longitude,
        'summary': response.body.hourly.summary,
        'humidity': response.body.hourly.data[0].humidity,
        'rainfall': response.body.hourly.data[0].precipProbability,
        'clouds': response.body.hourly.data[0].cloudCover
      });
    }
  });
}

module.exports = forecast;