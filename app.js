const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const EmpresaRoute = require("./Routes/EmpresaRouter")

app.use("/api/Empresa", EmpresaRoute)


const PORT = 3000;

app.listen(PORT, () => 
        {
            console.log(`Servidor corriendo en puerto http://localhost:3000`);
        });