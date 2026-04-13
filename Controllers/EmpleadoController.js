const Empleado = require("../Models/EmpleadoModel");

const agregarEmpleado = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, direccion, salario, puesto, departamento } = req.body;
        const empleado = new Empleado({ nombre, apellido, email, telefono, direccion, salario, puesto, departamento });
        await empleado.save();
        res.status(201).json({ message: "Empleado agregado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.body;
        const empleado = await Empleado.findByIdAndDelete(id);
        res.status(200).json({ message: "Empleado eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    agregarEmpleado,
    eliminarEmpleado
}
