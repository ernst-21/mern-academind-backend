const axios = require('axios');
const HttpError = require('../models/http-error');
const token =
  'pk.eyJ1IjoiZXJuc3QyMSIsImEiOiJja244YXg2NGUwdzQ5Mm5xbnI1bm9iMzQ0In0.WbiMplZBWTh53iXKIL3Ncg';

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${token}`
  );
  const data = response.data;

  if (!data || data.status === 'ZERO RESULTS') {
    const error = new HttpError(
      'Could not find the location for the specified address.',
      422
    );
    throw error;
  }
  const coordinates = data.features[0].geometry.coordinates;
  const location = {lat: coordinates[1], lng: coordinates[0]}
  return location;
}

module.exports = getCoordsForAddress;
