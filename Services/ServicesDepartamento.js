const { updateEmpresa } = require("./ServicesEmpresa");

async function getDepartamento() {
    try {
        const response = await fetch('http://localhost:3005/Departamento', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching Departamento');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching Departamento:', error);
        throw error;
    }
}

async function postDepartamento(nombre, empleados) {
    try {
        const Data = { nombre, empleados };

        const response = await fetch("http://localhost:3005/Departamento", {
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
        console.error('Error posting Departamento:', error);
        throw error;
    }
}

async function updateDepartamento(nombre, empleados, id) {
    try {
        const Data = { nombre, empleados };

        const response = await fetch(`http://localhost:3005/Departamento/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
        });

        if (!response.ok) {
            throw new Error("Error en PUT");
        }

        return await response.json();
    } catch (error) {
        console.error('Error update Departamento:', error);
        throw error;
    }
}


module.exports = {
    getDepartamento,
    postDepartamento,
    updateDepartamento,
    updateEmpresa
};