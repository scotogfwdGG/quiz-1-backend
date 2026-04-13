const Departamento = require("../Models/DepartamentoModel");

const agregarDepartamento = async (req, res) => {
    try {
        const { nombre, descripcion, id_empresa } = req.body;
        const departamento = await Departamento.create({ nombre, descripcion, id_empresa });
        res.json(departamento);
    } catch (error) {
        console.error("Error al agregar departamento:", error);
        res.status(500).json({ message: "Error al agregar departamento" });
    }
};

const eliminarDepartamento = async (req, res) => {
    try {
        const { id } = req.body;
        const departamento = await Departamento.destroy({ where: { id } });
        res.json(departamento);
    } catch (error) {
        console.error("Error al eliminar departamento:", error);
        res.status(500).json({ message: "Error al eliminar departamento" });
    }
};

module.exports = {
    agregarDepartamento,
    eliminarDepartamento
};