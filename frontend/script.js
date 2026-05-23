const API = "http://192.168.1.13:3000";

async function cargarIncidentes() {

    const response = await fetch(`${API}/incidentes`);

    const data = await response.json();

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    data.forEach(i => {

        lista.innerHTML += `
            <li>
                <b>${i.titulo}</b><br>
                ${i.descripcion}<br><br>
            </li>
        `;

    });

}

async function guardarIncidente() {

    const titulo = document.getElementById("titulo").value;

    const descripcion = document.getElementById("descripcion").value;

    await fetch(`${API}/incidentes`, {

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

cargarIncidentes();