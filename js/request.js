function getAllDatos() {
    $.ajax({
        url: "https://unfurbished-elissa-dcollet.ngrok-free.dev/APITecnicos-NoSQL/gastos",
        type: "GET",
        dataType: "json",
        success: function(datos) {
            console.log(datos);
            todosLosDatos = datos.data;
            crearTabla(todosLosDatos);
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud:", status, error);
        }
    });
}


function deleteGasto() {
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id"); 
            if (!id) return;

            Swal.fire({
                icon: 'warning',
                title: 'Confirmar eliminación',
                text: '¿Estás seguro de que deseas eliminar este gasto?',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("Eliminando gasto con ID:", id);
                    fetch(`https://unfurbished-elissa-dcollet.ngrok-free.dev/APITecnicos-NoSQL/gastos?id=${id}`, {
                        method: "DELETE"
                    })
                    .then(response => response.json())
                    .then(res => {
                        if (res.status === "success") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Eliminado',
                                text: res.message,
                                timer: 2000,
                                showConfirmButton: false
                            });
                            todosLosDatos = todosLosDatos.filter(d => d.id != id);
                            crearTabla(todosLosDatos);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: res.message || "Error al eliminar",
                            });
                        }
                    })
                    .catch(err => console.error("Error al eliminar:", err));
                }
            });
        });
    });
}






getAllDatos();
