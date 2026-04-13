const Empresa = require('../Models/Empresa');
const Departamento = require('../Models/Departamento');
const Empleado = require('../Models/Empleado');
const ServiceEmpresa = require('../Services/ServicesEmpresa');

const EmpresaController = {
    agregardepartamentos: async (req, res) => {
        const { nombre, departamentos } = req.body;
        const nuevaEmpresa = new Empresa(nombre, departamentos);
        try {
            const crearEmpresaDepart = await ServiceEmpresa.postEmpresa(nuevaEmpresa.nombre, nuevaEmpresa.departamentos);
            if (crearEmpresaDepart) {
                res.status(201).json({ message: "La Empresa y sus departamentos se crearon efectivamente", data: crearEmpresaDepart });
            } else {
                res.status(500).json({ message: "Fallo al crear la Empresa y sus departamentos" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al conectar con el servidor de base de datos", error: error.message });
        }
    },

    obtenerEmpresa: async (_req, res) => {
        try {
            const empresas = await ServiceEmpresa.getEmpresa();
            res.status(200).json(empresas[0] || {});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    agregarDepartamento: async (req, res) => {
        const { idEmpresa, nombreDepartamento } = req.body;
        const nuevoDepto = new Departamento(nombreDepartamento);
        try {
            const result = await ServiceEmpresa.agregarDepartamento(idEmpresa, nuevoDepto);
            res.status(200).json({ message: "Departamento agregado con éxito", data: result });
        } catch (error) {
            res.status(500).json({ message: "Error al agregar departamento", error: error.message });
        }
    },

    agregarEmpleado: async (req, res) => {
        const { idEmpresa, nombreDepartamento, nombreEmpleado, puestoEmpleado } = req.body;
        const nuevoEmpleado = new Empleado(nombreEmpleado, puestoEmpleado);
        try {
            const result = await ServiceEmpresa.agregarEmpleado(idEmpresa, nombreDepartamento, nuevoEmpleado);
            res.status(200).json({ message: "Empleado agregado con éxito", data: result });
        } catch (error) {
            res.status(500).json({ message: "Error al agregar empleado", error: error.message });
        }
    },

    eliminarEmpleado: async (req, res) => {
        const { idEmpresa, nombreDepartamento, nombreEmpleado } = req.body;
        try {
            const result = await ServiceEmpresa.eliminarEmpleado(idEmpresa, nombreDepartamento, nombreEmpleado);
            res.status(200).json({ message: "Empleado eliminado con éxito", data: result });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar empleado", error: error.message });
        }
    }
};

module.exports = EmpresaController;