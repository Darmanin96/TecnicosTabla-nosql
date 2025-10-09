let todosLosDatos = []
const codigo = document.getElementById("buscar-codigo")
const botonImporte = document.getElementById("btn-importe")
const inputFecha = document.getElementById("filtro-fecha")

function crearTabla(datos){
    const tbody = document.querySelector("#tabla-gastos tbody")
    tbody.innerHTML = ""

    datos.forEach(dato => {
        const fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${dato.nombreTecnico}</td>
            <td>${dato.codigoEmpleado}</td>
            <td>${dato.delegacion}</td>
            <td>${dato.importe}</td>
            <td>${dato.fecha}</td>
            <td>
                ${dato.imagenAlimento 
                    ? `<img src="data:image/jpeg;base64,${dato.imagenAlimento}" alt="Alimento" width="100" class="zoomable">`
                    : ''}
            </td>
            <td>
                ${dato.imagenTicket 
                    ? `<img src="data:image/jpeg;base64,${dato.imagenTicket}" alt="Ticket" width="100" class="zoomable">`
                    : ''}
            </td>
            <td>
                <button class="btn-eliminar" data-id="${dato.id}">Eliminar</button>
            </td>
        `
        tbody.appendChild(fila)
    })

    document.querySelectorAll(".zoomable").forEach(img => {
        img.addEventListener("click", () => zoomImagen(img.src))
    })

    deleteGasto();
}

function buscarCodigo(){
    const valor = codigo.value.trim().toLowerCase()
    const filtrados = todosLosDatos.filter(d =>
        d.codigoEmpleado.toLowerCase().includes(valor)
    )
    crearTabla(filtrados)
}

function ordenarImporte(){
    const ordenados = [...todosLosDatos].sort((a,b) => b.importe - a.importe)
    crearTabla(ordenados)
}

function filtrarFecha(){
    const fechaSeleccionada = inputFecha.value
    if (!fechaSeleccionada) {
        crearTabla(todosLosDatos)
        return
    }
    const filtrados = todosLosDatos.filter(d => d.fecha.startsWith(fechaSeleccionada))
    crearTabla(filtrados)
}

function zoomImagen(src){
    const overlay = document.createElement("div")
    overlay.style.position = "fixed"
    overlay.style.top = "0"
    overlay.style.left = "0"
    overlay.style.width = "100%"
    overlay.style.height = "100%"
    overlay.style.background = "rgba(0,0,0,0.8)"
    overlay.style.display = "flex"
    overlay.style.alignItems = "center"
    overlay.style.justifyContent = "center"
    overlay.style.cursor = "zoom-out"
    overlay.innerHTML = `<img src="${src}" style="max-width:90%;max-height:90%;border-radius:10px;">`
    overlay.addEventListener("click", () => document.body.removeChild(overlay))
    document.body.appendChild(overlay)
}

codigo.addEventListener("input", buscarCodigo)
botonImporte.addEventListener("click", ordenarImporte)
inputFecha.addEventListener("change", filtrarFecha)
