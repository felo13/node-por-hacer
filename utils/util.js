const rellenar = (caracter, limite) => {

    let adenda = '';
    for (let i = 0; i < limite; i++) {
        adenda = adenda + caracter;
    }
    return adenda;
}

module.exports = {
    rellenar
}