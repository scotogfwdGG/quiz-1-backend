class Empresa {
    constructor(nombre, departamentos = []) {
        this.nombre = nombre;
        this.departamentos = departamentos;
    }
}

module.exports = Empresa;