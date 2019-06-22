const request = require('request');

const geocode = (address, callback) =>{
const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibW9oZHJhcWlmIiwiYSI6ImNqd3YyejhmejAzdjQ0OW8ybXBhbXpweDkifQ.ZVZ-JLnAn9fvt2vaua-73A&limit=1';

  request({ url: geourl, json: true}, (error, response) =>{
    if(error) {
      callback('NOT CONECTED TO INTERNET!!!', undefined);
    } else if(response.body.features.length === 0){
      callback('No data. Try another search!!!' ,undefined);
    } else{
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
        source: response.body.attribution
      })
    }
  });
}

module.exports = geocode;