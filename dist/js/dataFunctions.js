export const setLocationObject = (locationObj, coordsObj) => {
  const { lat, lon, name, unit } = coordsObj;
  locationObj.setLat(lat);
  locationObj.setLong(lon);
  locationObj.setName(name);
  if (unit) {
    locationObj.setUnit(unit);
  }
};

export const getHomeLocation = () => {
  return localStorage.getItem("defaultWeatherLocation");
};

export const getWeatherFromCoords = async (locationObj) => {
  // const lat = locationObj.getLat();
  // const lon = locationObj.getLong();
  // const units = locationObj.getUnit();

  // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;

  // try {
  //   const wxStream = await fetch(url);
  //   const wxJson = await wxStream.json();
  //   return wxJson;
  // } catch (err) {
  //   console.log(err);
  // }

  const urlDataObj = {
    lat: locationObj.getLat(),
    lon: locationObj.getLong(),
    units: locationObj.getUnit(),
  };

  try {
    const wxStream = await fetch("./.netlify/functions/get_weather", {
      method: "POST",
      body: JSON.stringify(urlDataObj),
    });
    const wxJson = await wxStream.json();
    return wxJson;
  } catch (err) {
    console.log(err);
  }
};

export const getCoordsFromApi = async (entryText, units) => {
  // const regex = /^\d+$/g;
  // const flag = regex.test(entryText) ? "zip?zip" : "direct?q";
  // const url = `http://api.openweathermap.org/geo/1.0/${flag}=${entryText}&appid=${WEATHER_API_KEY}`;
  // const encodedUrl = encodeURI(url);
  // try {
  //   const dataStream = await fetch(encodedUrl);
  //   const jsonData = await dataStream.json();
  //   return jsonData;
  // } catch (err) {
  //   console.log(err.stack);
  // }

  const urlDataObj = {
    text: entryText,
    units: units,
  };
  try {
    const dataStream = await fetch("./.netlify/functions/get_coords", {
      method: "POST",
      body: JSON.stringify(urlDataObj),
    });
    const jsonData = await dataStream.json();
    return jsonData;
  } catch (err) {
    console.log(err.stack);
  }
};

export const cleanText = (text) => {
  const regex = / {2,}/g;
  const entryText = text.replaceAll(regex, " ").trim();
  return entryText;
};
