const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {

    res.send("Servidor DevOps funcionando 🚀");

});

app.get("/api/status", (req, res) => {

    res.json({
        status: "OK",
        servidor: "Ubuntu DevOps",
        fecha: new Date()
    });

});

app.listen(PORT, () => {

    console.log(`Servidor iniciado en puerto ${PORT}`);

});