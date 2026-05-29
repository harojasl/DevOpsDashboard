const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

/* =========================
   BASE DE DATOS
========================= */

const db = new sqlite3.Database("./database.db");

/* =========================
   CREAR TABLA
========================= */

db.run(`
CREATE TABLE IF NOT EXISTS incidentes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    descripcion TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

/* =========================
   API STATUS
========================= */

app.get("/api/status", (req, res) => {

    res.json({
        status: "OK",
        servidor: "Ubuntu DevOps",
        fecha: new Date()
    });

});

/* =========================
   OBTENER INCIDENTES
========================= */

app.get("/api/incidentes", (req, res) => {

    db.all(
        "SELECT * FROM incidentes ORDER BY id DESC",
        [],
        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json(rows);

        }
    );

});

app.delete("/api/incidentes/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM incidentes WHERE id = ?",
        [id],
        function (err) {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json({
                mensaje: "Incidente eliminado"
            });

        }
    );

});

});
const os = require("os");

app.get("/api/server-info", (req, res) => {

    res.json({

        hostname: os.hostname(),

        plataforma: os.platform(),

        uptime: Math.floor(os.uptime() / 60),

        memoriaTotal:
            Math.floor(os.totalmem() / 1024 / 1024) + " MB",

        memoriaLibre:
            Math.floor(os.freemem() / 1024 / 1024) + " MB",

        cpu: os.cpus()[0].model,

        fecha: new Date()

    });

});

/* =========================
   CREAR INCIDENTE
========================= */

app.post("/api/incidentes", (req, res) => {

    const { titulo, descripcion } = req.body;

    db.run(
        "INSERT INTO incidentes (titulo, descripcion) VALUES (?, ?)",
        [titulo, descripcion],
        function(err) {

            if (err) {
                res.status(500).json(err);
                return;
            }

            res.json({
                id: this.lastID,
                titulo,
                descripcion
            });

        }
    );

});

/* =========================
   INICIO SERVIDOR
========================= */

app.listen(PORT, () => {

    console.log(`Servidor iniciado en puerto ${PORT}`);

});
