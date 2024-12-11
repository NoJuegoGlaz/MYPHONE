document.addEventListener("DOMContentLoaded", function () {
    let xmlDoc = new XMLHttpRequest();
    xmlDoc.open("GET", "../baseDatos/premontajes.xml", false);
    xmlDoc.send();
    let xml = xmlDoc.responseXML;
  
    console.log(xml);
  
    let divProductoContainer = document.getElementById("galeria");
    let configuracion = xml.getElementsByTagName("configuracion");
  
    // Primero creamos los productos
    for (let i = 0; i < configuracion.length; i++) {
      let configuracionItem = configuracion[i];
  
      // Obtenemos los datos del XML
      let titulo = configuracionItem.getElementsByTagName("titulo")[0]?.textContent || "Título no disponible";
      let diseno = configuracionItem.getElementsByTagName("diseno")[0]?.textContent || "Diseño no disponible";
      let precio = configuracionItem.getElementsByTagName("precio")[0]?.textContent || "Precio no disponible";
      let color = diseno.toLowerCase() || "default";
  
      // Creamos un nuevo div para el producto
      let nuevoDivProducto = document.createElement("div");
      nuevoDivProducto.classList.add("producto");
  
      // Creamos el contenedor 'movil' dentro del producto
      let divMovil = document.createElement("div");
      divMovil.classList.add("movil");
  
      divMovil.innerHTML = `
        <img src="imgs/movil${color}.jpg" alt="Imagen del producto">
        <h4 class="title">${titulo}</h4>
        <p class="precio">${precio} <button type="button" class="visualizar">Visualizar</button></p>
      `;
  
      nuevoDivProducto.appendChild(divMovil);
      divProductoContainer.appendChild(nuevoDivProducto);
    }
  
    // Función para agregar eventos a los botones
    function agregarEventosBotones() {
      // Seleccionamos todos los botones "visualizar"
      let botonesVisualizar = document.querySelectorAll(".visualizar");
  
      // Añadimos el evento a cada uno
      botonesVisualizar.forEach((boton) => {
        boton.addEventListener("click", (event) => {
          const divPadre = boton.closest(".movil"); // Encuentra el div padre de clase 'movil'
          const tituloDiv = divPadre.querySelector(".title").textContent; // Obtiene el título
  
          // Buscar el producto correspondiente en el XML
          for (let i = 0; i < configuracion.length; i++) {
            let configuracionItem = configuracion[i];
            let tituloXML = configuracionItem.getElementsByTagName("titulo")[0]?.textContent || "";
  
            // Si el título coincide, obtenemos los detalles
            if (tituloDiv === tituloXML) {
              // Crear y mostrar el div de visualización
              let divVisualizacion = document.createElement("div");
              divVisualizacion.classList.add("visualizacion");
  
              // Obtener los detalles
              let bateria = configuracionItem.getElementsByTagName("bateria")[0]?.textContent || "Batería no disponible";
              let almacenamiento = configuracionItem.getElementsByTagName("almacenamiento")[0]?.textContent || "Almacenamiento no disponible";
              let ram = configuracionItem.getElementsByTagName("ram")[0]?.textContent || "RAM no disponible";
              let procesador = configuracionItem.getElementsByTagName("procesador")[0]?.textContent || "Procesador no disponible";
              let pantalla = configuracionItem.getElementsByTagName("pantalla")[0]?.textContent || "Pantalla no disponible";
              let camara = configuracionItem.getElementsByTagName("camara")[0]?.textContent || "Cámara no disponible";
              let diseno = configuracionItem.getElementsByTagName("diseno")[0]?.textContent || "Diseño no disponible"; // Agregado aquí
              let color = diseno.toLowerCase() || "default";
              let precio = configuracionItem.getElementsByTagName("precio")[0]?.textContent || "Precio no disponible";
  
              divVisualizacion.innerHTML = `
                <img src="imgs/movil${color}.jpg" alt="Imagen del producto">
                <div class="especVisu">
                <button class="cerrar-btn" aria-label="Cerrar">X</button> <!-- Botón de cerrar -->
                <p>Cámara: ${camara}</p>
                <p>Batería: ${bateria}</p>
                <p>Almacenamiento: ${almacenamiento}</p>
                <p>RAM: ${ram}</p>
                <p>Procesador: ${procesador}</p>
                <p>Pantalla: ${pantalla}</p>
                <p>Diseño: ${diseno}</p>
                <p>Precio:<span class="precioVisu">${precio}</span></p>
                </div>  
              `;            

              // Agregar el div de visualización al contenedor principal
              divProductoContainer.appendChild(divVisualizacion);

              let cerrarBtn = divVisualizacion.querySelector('.cerrar-btn'); // Selecciona el botón "cerrar" dentro del nuevo div
              cerrarBtn.addEventListener('click', function(event) {
                let divPadre = event.target.closest('.visualizacion'); // Encuentra el div contenedor más cercano al botón
                if (divPadre) {
                  divPadre.remove(); // Elimina el div
                }
              });
  
              break; // Detener la búsqueda una vez encontrado
              
            }
          }       
        });
      });
    }
  
    // Llamamos a la función después de que todo esté en el DOM
    agregarEventosBotones();
  });
  
  
