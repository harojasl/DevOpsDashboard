const API = "http://localhost:3000/api/incidentes";

/* =========================
   GUARDAR INCIDENTE
========================= */

async function guardarIncidente() {

    const titulo = document.getElementById("titulo").value;

    const descripcion =
        document.getElementById("descripcion").value;

    await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            titulo,
            descripcion
        })

    });

    cargarIncidentes();

}

/* =========================
   CARGAR INCIDENTES
========================= */

async function cargarIncidentes() {

    const respuesta = await fetch(API);

    const incidentes = await respuesta.json();

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    incidentes.forEach(incidente => {

        lista.innerHTML += `
            <li>
                <strong>${incidente.titulo}</strong><br>
                ${incidente.descripcion}<br>
                <small>${incidente.fecha}</small>
            </li>
            <hr>
        `;

    });

}

cargarIncidentes();
async function cargarInfoServidor() {

    const response =
        await fetch("http://localhost:3000/api/server-info");

    const data = await response.json();

    const lista =
        document.getElementById("serverInfo");

    lista.innerHTML = `

        <li><b>Hostname:</b> ${data.hostname}</li>

        <li><b>Plataforma:</b> ${data.plataforma}</li>

        <li><b>Uptime:</b> ${data.uptime} minutos</li>

        <li><b>RAM Total:</b> ${data.memoriaTotal}</li>

        <li><b>RAM Libre:</b> ${data.memoriaLibre}</li>

        <li><b>CPU:</b> ${data.cpu}</li>

    `;

}

cargarInfoServidor();