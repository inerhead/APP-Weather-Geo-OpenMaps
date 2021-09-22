const axios = require('axios').default;

class Busquedas {

    constructor() {

    }

    get paramMapBox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es'
        };
    }

    get paramOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        };
    }


    async buscarCiudades(lugar = '') {

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramMapBox

            });

            const rest = await instance.get();
            return rest.data.features.map((ciudad) => ({
                id: ciudad.id,
                nombre: ciudad.place_name,
                lng: ciudad.center[0],
                lat: ciudad.center[1],
            }));

        } catch (error) {
            console.log(error);
        }
    }

    async climaLugar(lat, lon) {

        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramOpenWeather, lat, lon },

            });

            const rest = await instance.get();


            return {
                desc: rest.data.weather[0].description,
                min: rest.data.main.temp_min,
                max: rest.data.main.temp_max,
                temp: rest.data.main.temp,
            };



        } catch (error) {
            console.log('ERRRORORRORORORRRORORROROROROOROROR');
            return {
                desc: "",
                min: "",
                max: "",
                temp: "",
            };

        }


    }
}

module.exports = Busquedas;