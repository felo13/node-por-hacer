// Lista de Imports
const fs = require('fs');

let listadoPorHacer = [];
let nomArchivo = 'DB/data.json';

const guardarDB = () => {

    return new Promise((resolve, reject) => {
        let data = JSON.stringify(listadoPorHacer);

        fs.writeFile(nomArchivo, data, (err) => {
            if (err) reject(err);
            else
                resolve(nomArchivo);
        });
    });
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const cargarDB = () => {

    try {
        listadoPorHacer = require("../" + nomArchivo);
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    cargarDB();
    if (!listadoPorHacer.find((item) => item.descripcion === descripcion)) {
        let porHacer = {
            descripcion,
            completado: false
        };
        listadoPorHacer.push(porHacer);
        guardarDB();
        return porHacer;
    } else {
        return null;
    }
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    tareaAct = listadoPorHacer.find((item) => item.descripcion === descripcion);
    if (tareaAct) {
        if (completado === 'true' || completado === true) {
            tareaAct.completado = true;
        } else {
            tareaAct.completado = false;
        }
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();
    filtrado = listadoPorHacer.filter((item) => item.descripcion != descripcion);
    if (filtrado.length != listadoPorHacer.length) {
        listadoPorHacer = filtrado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}