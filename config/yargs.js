const opts = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripción de la tarea por hacer'
    },
    completado: {
        alias: 'c',
        default: false,
        desc: 'Marca como pendiente o completada la tarea'
    }
}

const argv = require('yargs')
    .command('listar', 'Muestra todas las tareas creadas')
    .command('crear', 'Crea una nueva tarea', opts)
    .command('actualizar', 'Actualiza una tarea para completarla', opts)
    .command('borrar', 'Borra una tarea', opts)
    .help()
    .argv;

module.exports = {
    argv
}