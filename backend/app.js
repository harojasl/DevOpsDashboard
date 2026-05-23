const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS incidentes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            descripcion TEXT,
            fecha DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

});

app.get("/incidentes", (req, res) => {

    db.all("SELECT * FROM incidentes ORDER BY id DESC", [], (err, rows) => {

        if (err) {
            res.status(500).json(err);
            return;
        }

        res.json(rows);

    });

});

app.post("/incidentes", (req, res) => {

    const { titulo, descripcion } = req.body;

    db.run(
        "INSERT INTO incidentes (titulo, descripcion) VALUES (?, ?)",
        [titulo, descripcion],
        function (err) {

            if (err) {
                res.status(500).json(err);
                return;
            }

            res.json({
                id: this.lastID
            });

        }
    );

});

app.listen(3000, () => {

    console.log("Servidor iniciado en puerto 3000");

});