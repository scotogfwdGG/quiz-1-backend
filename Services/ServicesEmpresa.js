async function getEmpresa() {
    try {
        const response = await fetch('http://localhost:3005/Empresa', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching Empresa');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching Empresa:', error);
        throw error;
    }
}

async function postEmpresa(nombre, departamentos) {
    try {
        const Data = { nombre, departamentos };

        const response = await fetch("http://localhost:3005/Empresa", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error en POST");
        }

        return await response.json();
    } catch (error) {
        console.error('Error posting Empresa:', error);
        throw error;
    }
}

async function updateEmpresa(id, updatedData) {
    try {
        const response = await fetch(`http://localhost:3005/Empresa/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error("Error en PUT");
        }

        return await response.json();
    } catch (error) {
        console.error('Error update Empresa:', error);
        throw error;
    }
}

async function agregarDepartamento(idEmpresa, nuevoDepartamento) {
    const empresas = await getEmpresa();
    const empresa = empresas.find(e => e.id == idEmpresa);
    if (!empresa) throw new Error("Empresa no encontrada");

    empresa.departamentos.push(nuevoDepartamento);
    return await updateEmpresa(idEmpresa, empresa);
}

async function agregarEmpleado(idEmpresa, nombreDepartamento, nuevoEmpleado) {
    const empresas = await getEmpresa();
    const empresa = empresas.find(e => e.id == idEmpresa);
    if (!empresa) throw new Error("Empresa no encontrada");

    const depto = empresa.departamentos.find(d => d.nombre === nombreDepartamento);
    if (!depto) throw new Error("Departamento no encontrado");

    depto.empleados.push(nuevoEmpleado);
    return await updateEmpresa(idEmpresa, empresa);
}

async function eliminarEmpleado(idEmpresa, nombreDepartamento, nombreEmpleado) {
    const empresas = await getEmpresa();
    const empresa = empresas.find(e => e.id == idEmpresa);
    if (!empresa) throw new Error("Empresa no encontrada");

    const depto = empresa.departamentos.find(d => d.nombre === nombreDepartamento);
    if (!depto) throw new Error("Departamento no encontrado");

    depto.empleados = depto.empleados.filter(emp => emp.nombre !== nombreEmpleado);
    return await updateEmpresa(idEmpresa, empresa);
}

module.exports = {
    getEmpresa,
    postEmpresa,
    updateEmpresa,
    agregarDepartamento,
    agregarEmpleado,
    eliminarEmpleado
};