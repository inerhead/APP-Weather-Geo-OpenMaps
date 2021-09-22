require('dotenv').config()
const { inquirerMenu, pausa, leerInput, listarCiudades } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {
    let opt = '';
    const busq = new Busquedas();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const ciudad = await leerInput();
                const places = await busq.buscarCiudades(ciudad);

                const id = await listarCiudades(places);
                const lugarSelect = places.find(pl => pl.id === id);
                const details = await busq.climaLugar(lugarSelect.lat, lugarSelect.lng);

                console.log('================================='.green);
                console.log('    INFORMACION DE LA CIUDAD'.green);
                console.log('=================================\n'.green);
                console.log('Ciudad:', lugarSelect.nombre);
                console.log('Lat:', lugarSelect.lat);
                console.log('Lng:', lugarSelect.lng);
                console.log('Temperatura:', details.temp);
                console.log('Mínima:', details.min);
                console.log('Máxima:', details.max);
                break;

            case '2':

                break;

            default:
                console.clear();
                break;
        }

        if (opt !== '0') await pausa();

    } while (opt !== '0');

};


main();