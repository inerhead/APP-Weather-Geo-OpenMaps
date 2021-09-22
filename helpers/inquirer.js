const inquirer = require('inquirer');
require('colors');



const inquirerMenu = async() => {
    console.clear();

    console.log('================================='.green);
    console.log('       Choose an Option'.green);
    console.log('=================================\n'.green);

    const preguntas = [{
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer ?',
        choices: [{
                value: '1',
                name: '1. Buscar ciudad'
            },
            {
                value: '2',
                name: '2. Ver historial'
            },
            {
                value: '0',
                name: '0. Salir'
            }
        ]
    }];

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;

};

const pausa = async() => {

    const preguntaPausa = [{
        type: 'input',
        name: 'enter',
        message: `\nPress ${'ENTER'.green} to continue...\n`
    }];

    console.log('\n');
    await inquirer.prompt(preguntaPausa);

};

const leerInput = async(message) => {
    const preguntaPausa = [{
        type: 'input',
        name: 'Ciudad',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor'.red;
            }

            return true;
        }
    }];

    console.log('\n');
    const { Ciudad } = await inquirer.prompt(preguntaPausa);
    return Ciudad;
};

const listarCiudades = async(lugares) => {

    let choices = [{
        value: `0`,
        name: `0. Cancelar`
    }];
    lugares.forEach((lugar, index) => {
        const idx = `${index + 1}`.green;
        const choise = {
            value: `${lugar.id}`,
            name: `${idx}. ${lugar.nombre}`
        };
        choices.push(choise);
    });



    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar ?',
        choices
    }];

    console.log('\n\n');
    const { id } = await inquirer.prompt(preguntas);
    return id;

};




module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarCiudades
};