const Empresa = require('../Models/Empresa');
const Departamento = require('../Models/Departamento');
const Empleado = require('../Models/Empleado');
const ServiceEmpresa = require('../Services/ServicesEmpresa');

let miEmpresaBase = new Empresa('Cotinis S.A.');

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
        try {
            const empresas = await ServiceEmpresa.getEmpresa();
            if (empresas.length === 0) return res.status(404).json({ error: "Empresa no encontrada" });
            
            const empresa = empresas[0];
            const nombreDepto = req.body.nombre;
            let nuevoDepto = new Departamento(nombreDepto);
            
            empresa.departamentos.push(nuevoDepto);
            const updated = await ServiceEmpresa.updateEmpresa(empresa.nombre, empresa.departamentos, empresa.id);
            
            res.status(201).json({ mensaje: "Departamento creado", departamento: nuevoDepto, data: updated });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    agregarEmpleado: async (req, res) => {
        try {
            const { nombreDepto, nombre, puesto } = req.body;
            const empresas = await ServiceEmpresa.getEmpresa();
            if (empresas.length === 0) return res.status(404).json({ error: "Empresa no encontrada" });
            
            const empresa = empresas[0];
            const depto = empresa.departamentos.find(d => d.nombre === nombreDepto);
            if (!depto) {
                return res.status(404).json({ error: "Departamento no encontrado" });
            }
            
            const nuevoEmpleado = new Empleado(nombre, puesto);
            depto.empleados.push(nuevoEmpleado);
            
            const updated = await ServiceEmpresa.updateEmpresa(empresa.nombre, empresa.departamentos, empresa.id);
            res.status(201).json({ mensaje: "Empleado agregado", empleado: nuevoEmpleado, data: updated });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    eliminarEmpleado: async (req, res) => {
        try {
            const { nombreDepto, nombre } = req.body;
            const empresas = await ServiceEmpresa.getEmpresa();
            if (empresas.length === 0) return res.status(404).json({ error: "Empresa no encontrada" });
            
            const empresa = empresas[0];
            const depto = empresa.departamentos.find(d => d.nombre === nombreDepto);
            if (!depto) {
                return res.status(404).json({ error: "Departamento no encontrado" });
            }
            
            const indexEmpleado = depto.empleados.findIndex(e => e.nombre === nombre);
            if (indexEmpleado === -1) {
                return res.status(404).json({ error: "Empleado no encontrado" });
            }
            
            const empleadoEliminado = depto.empleados.splice(indexEmpleado, 1)[0];
            await ServiceEmpresa.updateEmpresa(empresa.nombre, empresa.departamentos, empresa.id);
            
            res.status(200).json({ mensaje: "Empleado eliminado", empleado: empleadoEliminado });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = EmpresaController;