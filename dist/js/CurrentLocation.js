export default class CurrentLocation {
  #name;
  #lat;
  #long;
  #unit;

  constructor() {
    this.#name = "Current Location";
    this.#lat = null;
    this.#long = null;
    this.#unit = "metric";
  }

  getName() {
    return this.#name;
  }
  setName(name) {
    this.#name = name;
  }

  getLat() {
    return this.#lat;
  }
  setLat(lat) {
    this.#lat = lat;
  }

  getLong() {
    return this.#long;
  }
  setLong(long) {
    this.#long = long;
  }

  getUnit() {
    return this.#unit;
  }
  setUnit(unit) {
    this.#unit = unit;
  }

  toggleUnit() {
    this.#unit = this.#unit === "metric" ? "imperial" : "metric";
  }
}
