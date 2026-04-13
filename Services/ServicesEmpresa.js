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

async function updateEmpresa(nombre, departamentos, id) {
    try {
        const Data = { nombre, departamentos };

        const response = await fetch(`http://localhost:3005/Empresa/${id}`, {
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
        console.error('Error update Empresa:', error);
        throw error;
    }
}


module.exports = {
    getEmpresa,
    postEmpresa,
    updateEmpresa
};