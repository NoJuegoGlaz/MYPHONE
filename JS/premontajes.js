document.addEventListener("DOMContentLoaded", function () {
    fetch("../baseDatos/premontajes.json") // Cambia el archivo a JSON
        .then(response => response.json()) // Parsear el JSON
        .then(data => {
            console.log(data); // Procesa el JSON como necesites
            let configuraciones = data.configuraciones; // Acceder al array de configuraciones
            
            let divProductoContainer = document.getElementById("galeria");

            // Crear productos desde el JSON
            configuraciones.forEach(config => {
                let titulo = config.titulo || "Título no disponible";
                let diseno = config.diseno || "Diseño no disponible";
                let precio = config.precio || "Precio no disponible";
                let color = diseno.toLowerCase() || "default";

                // Crear un nuevo div para el producto
                let nuevoDivProducto = document.createElement("div");
                nuevoDivProducto.classList.add("producto");

                // Crear el contenedor 'movil' dentro del producto
                let divMovil = document.createElement("div");
                divMovil.classList.add("movil");

                divMovil.innerHTML = `
                    <img src="imgs/movil${color}.jpg" alt="Imagen del producto">
                    <h4 class="title">${titulo}</h4>
                    <p class="precio">${precio} <button type="button" class="visualizar">Visualizar</button></p>
                `;

                nuevoDivProducto.appendChild(divMovil);
                divProductoContainer.appendChild(nuevoDivProducto);
            });

            // Agregar eventos a los botones después de crear el DOM
            agregarEventosBotones(configuraciones);
        })
        .catch(error => {
            console.error("Error al cargar el archivo JSON:", error);
        });
});

function agregarEventosBotones(configuraciones) {
    let botonesVisualizar = document.querySelectorAll(".visualizar");

    botonesVisualizar.forEach((boton) => {
        boton.addEventListener("click", (event) => {
            const divPadre = boton.closest(".movil"); // Encuentra el div padre de clase 'movil'
            const tituloDiv = divPadre.querySelector(".title").textContent; // Obtiene el título

            // Buscar el producto correspondiente en el JSON
            let producto = configuraciones.find(config => config.titulo === tituloDiv);

            if (producto) {
                // Crear y mostrar el div de visualización
                let divVisualizacion = document.createElement("div");
                divVisualizacion.classList.add("visualizacion");

                // Obtener los detalles
                let { bateria, almacenamiento, ram, procesador, pantalla, camara, diseno, precio } = producto;
                let color = diseno.toLowerCase() || "default";

                divVisualizacion.innerHTML = `
                    <img src="imgs/movil${color}.jpg" alt="Imagen del producto">
                    <div class="especVisu">
                        <button class="cerrar-btn" aria-label="Cerrar">X</button>
                        <p>Cámara: ${camara || "Cámara no disponible"}</p>
                        <p>Batería: ${bateria || "Batería no disponible"}</p>
                        <p>Almacenamiento: ${almacenamiento || "Almacenamiento no disponible"}</p>
                        <p>RAM: ${ram || "RAM no disponible"}</p>
                        <p>Procesador: ${procesador || "Procesador no disponible"}</p>
                        <p>Pantalla: ${pantalla || "Pantalla no disponible"}</p>
                        <p>Diseño: ${diseno || "Diseño no disponible"}</p>
                        <p>Precio:<span class="precioVisu">${precio || "Precio no disponible"}</span></p>
                    </div>
                `;

                document.getElementById("galeria").appendChild(divVisualizacion);

                // Evento para cerrar el modal
                let cerrarBtn = divVisualizacion.querySelector('.cerrar-btn');
                cerrarBtn.addEventListener('click', function () {
                    divVisualizacion.remove(); // Elimina el modal
                });
            }
        });
    });
}

  
