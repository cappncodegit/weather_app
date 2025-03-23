const fetch = require("node-fetch");

const { WEATHER_API_KEY } = process.env;

exports.handler = async (event, context) => {
  const params = JSON.parse(event.body);
  const { lat, lon, units } = params;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
  try {
    const wxStream = await fetch(url);
    const wxJson = await wxStream.json();
    return {
      statusCode: 200,
      body: JSON.stringify(wxJson),
    };
  } catch (err) {
    return {
      statusCode: 422,
      body: err.stack,
    };
  }
};
