// Lista de imports
const colors = require('colors');
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const util = require('./utils/util');

let comando = argv._[0];
const longitud = 30;

const listar = (listado) => {
    let msg = 'Por Hacer';
    let relleno = util.rellenar('=', (longitud - msg.length) / 2);
    let mensaje = (relleno + msg + relleno + '\n').magenta;
    for (const tarea of listado) {
        relleno = util.rellenar(' ', longitud - tarea.descripcion.length);
        if (tarea.completado) {
            mensaje = mensaje + `- ${tarea.descripcion + relleno}  (x)\n`.green;
        } else {
            mensaje = mensaje + (`- ${tarea.descripcion + relleno}  ( )\n`);
        }
    }
    mensaje = mensaje + util.rellenar('=', longitud).magenta;
    return mensaje;
};

switch (comando) {
    case 'listar':
        let listado = porHacer.getListado();
        console.log(listar(listado));
        break;

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        if (tarea) {
            console.log(`Tarea "${tarea.descripcion}" creada`);
        } else {
            console.error(`La tarea que estás intentando ingresar, ya existe`.red);
        }
        break;

    case 'actualizar':
        let resultado = porHacer.actualizar(argv.descripcion, argv.completado);
        if (resultado) {
            console.log(`Tarea "${argv.descripcion}" actualizada`);
        } else {
            console.error(`La tarea que estás intentando actualizar, no existe`.red);
        }
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        if (borrado) {
            console.log(`Tarea "${argv.descripcion}" borrada`);
        } else {
            console.error(`La tarea que estás intentando borrar, no existe`.red);
        }

        break;

    default:
        console.log('Comando no reconocido');
        break;
}