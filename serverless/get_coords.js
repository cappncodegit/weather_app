const fetch = require("node-fetch");

const { WEATHER_API_KEY } = process.env;

exports.handler = async (event, context) => {
  const params = JSON.parse(event.body);
  const { text, units } = params;
  const regex = /^\d+$/g;
  const flag = regex.test(text) ? "zip?zip" : "direct?q";
  const url = `http://api.openweathermap.org/geo/1.0/${flag}=${text}&appid=${WEATHER_API_KEY}`;
  const encodedUrl = encodeURI(url);
  try {
    const dataStream = await fetch(encodedUrl);
    const jsonData = await dataStream.json();
    return {
      statusCode: 200,
      body: JSON.stringify(jsonData),
    };
  } catch (err) {
    return { statusCode: 422, body: err.stack };
  }
};
