import axios from "axios";

class NASA {
  apiKey: string;
  constructor() {
    this.apiKey = process.env.NASA_API_KEY as string;
  }

  // NASA Earth Observing System Data and Information System (EOSDIS)
  async EOSDIS(lat: string, lon: string) {
    // const url = `https://api.nasa.gov/planetary/earth/temperature?lon=${lon}&lat=${lat}&dim=0.1&api_key=${this.apiKey}`;
    // const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOT,TS,WS10M,ALLSKY_SFC_SW_DWN&start=20230101&end=20231231&latitude=${lat}&longitude=${lon}&community=ag&format=JSON&time-standard=UTC`;
    // const url = `https://sedac.ciesin.columbia.edu/data/sets/api.json`;
    // const url = `https://api.nasa.gov/air_quality?api_key=${this.apiKey}&latitude=${lat}&longitude=${lon}&format=json`;
    // const url = `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}`;// Astronomy Picture of the Day
    // const url = `https://api.globe.gov/search/v1/measurement/protocol/{protocol}?geojson=TRUE&api_key=${this.apiKey}`;
    // const url = `https://api.globe.gov/search/v1/measurement/?protocols=water_temperatures&datefield=measuredDate&startdate=2024-09-01&enddate=2024-10-01&field1=latitude&field1min=33.2036331&field2=longitude&field2min=-87.5503964&field3=elevation&field3min=395&geojson=TRUE&sample=TRUE&api_key=${this.apiKey}`;
    const url = `https://api.globe.gov/search/v1/measurement/?protocols=water_temperatures&datefield=measuredDate&startdate=2024-09-01&enddate=2024-10-01&field1=latitude&field1min=33.2036331&field2=longitude&field2min=-87.5503964&field3=elevation&field3min=395&geojson=TRUE&sample=TRUE&api_key=${this.apiKey}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos", error);
      return error;
    }
  }
}

export default new NASA();
