require('dotenv').config()
const { guardar, leerJSON } = require('./db/base');
const { inquirerMenu, pausa, leerInput, listarCiudades } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {
    let opt = '';
    const busq = new Busquedas();
    do {
        const data = leerJSON();
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const ciudad = await leerInput();
                const places = await busq.buscarCiudades(ciudad);

                const id = await listarCiudades(places);
                const lugarSelect = places.find(pl => pl.id === id);
                if (!lugarSelect) break;
                const details = await busq.climaLugar(lugarSelect.lat, lugarSelect.lng);

                busq.saveConsulta(lugarSelect.nombre);
                console.log('================================='.green);
                console.log('    INFORMACION DE LA CIUDAD'.green);
                console.log('=================================\n'.green);
                console.log('Ciudad:', lugarSelect.nombre);
                console.log('Lat:', lugarSelect.lat);
                console.log('Lng:', lugarSelect.lng);
                console.log('Temperatura:', details.temp);
                console.log('Mínima:', details.min);
                console.log('Máxima:', details.max);

                //console.log("*************************");
                //console.log(busq.getTopFive());
                busq.lugaresFromJSON(data);
                guardar(JSON.stringify(busq.getTopFive()));
                break;

            case '2':
                //const data = leerJSON();
                console.log('================================='.green);
                console.log('    INFORMACION HISTORICO'.green);
                console.log('=================================\n'.green);

                //console.log(data);

                data.forEach((d, idx) => {
                    const i = `${idx + 1}.`.green;
                    console.log(`${i} ${d}`);

                });
                break;

            default:
                console.clear();
                break;
        }

        if (opt !== '0') await pausa();

    } while (opt !== '0');

};


main();