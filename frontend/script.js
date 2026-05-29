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
async function eliminarIncidente(id) {

    await fetch(`http://localhost:3000/api/incidentes/${id}`, {
        method: "DELETE"
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
li.innerHTML = `
    <strong>${incidente.titulo}</strong>
    <br>
    ${incidente.descripcion}
    <br>
    <small>${incidente.fecha}</small>
    <br><br>

    <button onclick="eliminarIncidente(${incidente.id})">
        Eliminar
    </button>
`;