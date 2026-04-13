const express = require('express');
const router = express.Router();

const EmpresaController = require("../Controllers/EmpresaController");

router.get("/obtenerEmpresa", EmpresaController.obtenerEmpresa);
router.post("/crearEmpresa", EmpresaController.agregardepartamentos);
router.post("/agregarDepartamento", EmpresaController.agregarDepartamento);
router.post("/agregarEmpleado", EmpresaController.agregarEmpleado);
router.delete("/eliminarEmpleado", EmpresaController.eliminarEmpleado);

module.exports = router;
