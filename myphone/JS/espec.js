//Parte de desplegables
document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', function () {
        const dropdownContent = this.nextElementSibling; // Encuentra el contenido relacionado
        dropdownContent.classList.toggle('show'); // Alterna la clase 'show'
    });
});


//Parte de utilización del xml para visor y desplegables
let xmlDoc = new XMLHttpRequest();
xmlDoc.open("GET", "../baseDatos/especCompo.xml", false);
xmlDoc.send();
let xml = xmlDoc.responseXML;

console.log(xml)//Comprobación

let categoriaCamara = xml.getElementsByTagName("categoria")[0];
let opcionesCam = categoriaCamara.getElementsByTagName("opcion");
// Recorremos todas las opciones
for (let i = 0; i < opcionesCam.length; i++) {
    // Obtenemos la especificación y el precio de la opción actual
    let especificacion = opcionesCam[i].getElementsByTagName("especificacion")[0].textContent;
    let precio = opcionesCam[i].getElementsByTagName("precio")[0].textContent;

    // Ahora puedes hacer algo con estos valores, por ejemplo, mostrarlos en el HTML:
    let divEspec = document.getElementsByClassName("especCam")[i]; // Seleccionamos el div correspondiente
    divEspec.innerHTML = `<p class="especi"> ${especificacion} </p> <p class="presio"> ${precio}€ </p>`;


    //Parte de componente seleccionado
    const dropdownContent = document.querySelectorAll('.dropdown-content .cam, .dropdown-content .bat, .dropdown-content .Alma, .dropdown-content .MemRam, .dropdown-content .Proce, .dropdown-content .Panta, .dropdown-content .Dis');

    // Iteramos sobre ellos y añadimos el evento click
    dropdownContent.forEach(item => {
        item.addEventListener('click', function () {
            // Obtenemos la imagen dentro de cada div
            const imgSrc = this.querySelector('img').src;
            if (imgSrc.includes("imgs/camaraReal.jpg")) {
                let numOp = this.querySelector('img').getAttribute('data-opcion');
                let num = numOp.charAt(6);
                let especVisor = opcionesCam[num].getElementsByTagName("especificacion")[0].textContent;
                let precioVisor = opcionesCam[num].getElementsByTagName("precio")[0].textContent;

                // Seleccionamos el div con id="visorimg" y cambiamos su contenido
                const visorImg = document.getElementById('visorimg');
                visorImg.innerHTML = `<img src="${imgSrc}" alt="Seleccionado" <br> <p>La cámara tiene una capacidad de: ${especVisor} </p> <p>El precio de la cámara es de: ${precioVisor}€ </p>`;

                // Este event listener se debería añadir solo una vez, fuera del 'forEach'
                const botonAñadirSeleccion = document.getElementById('añadirSeleccion');
                botonAñadirSeleccion.onclick = function () {
                    const seleccion = document.getElementById("selecCam");

                    if (!seleccion.innerHTML.includes("Cámara")) {
                        // Añadir solo una vez la selección
                        seleccion.innerHTML += `- Cámara ${especVisor} <button id="revertirSeleccionCam">Revertir camara</button>`;

                        const suma = document.getElementById("suma");
                        suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) + (parseInt(precioVisor))}€`;

                        // Botón para revertir la selección
                        const botonRevertir = document.getElementById('revertirSeleccionCam');
                        botonRevertir.addEventListener('click', function () {
                            // Vaciamos el contenido de la selección y el precio
                            const seleccion = document.getElementById("selecCam");
                            seleccion.innerHTML = '';  // Limpiar la selección

                            const suma = document.getElementById("suma");

                            suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) - (parseInt(precioVisor))}€`;  // Restablecer el precio a 0€

                            // También puedes eliminar la imagen del visor
                            const visorImg = document.getElementById('visorimg');
                            visorImg.innerHTML = '';  // Limpiar la imagen seleccionada
                        });

                    } else {
                        alert("¡Solo puedes añadir una cámara!");
                    }
                }
            };
        });
    });

}


let categoriaBateria = xml.getElementsByTagName("categoria")[1];
let opcionesBat = categoriaBateria.getElementsByTagName("opcion");
// Recorremos todas las opciones
for (let i = 0; i < opcionesBat.length; i++) {
    // Obtenemos la especificación y el precio de la opción actual
    let especificacion = opcionesBat[i].getElementsByTagName("especificacion")[0].textContent;
    let precio = opcionesBat[i].getElementsByTagName("precio")[0].textContent;

    // Ahora puedes hacer algo con estos valores, por ejemplo, mostrarlos en el HTML:
    let divEspec = document.getElementsByClassName("especBat")[i]; // Seleccionamos el div correspondiente
    divEspec.innerHTML = ` <p class="especi"> ${especificacion} </p> <p class="presio"> ${precio}€ </p> `;


    //Parte de componente seleccionado
    const dropdownContent = document.querySelectorAll('.dropdown-content .cam, .dropdown-content .bat, .dropdown-content .Alma, .dropdown-content .MemRam, .dropdown-content .Proce, .dropdown-content .Panta, .dropdown-content .Dis');

    // Iteramos sobre ellos y añadimos el evento click
    dropdownContent.forEach(item => {
        item.addEventListener('click', function () {
            // Obtenemos la imagen dentro de cada div
            const imgSrc = this.querySelector('img').src;
            if (imgSrc.includes("imgs/bateriaReal.jpg")) {
                let numOp = this.querySelector('img').getAttribute('data-opcion');
                let num = numOp.charAt(6);
                let especVisor = opcionesBat[num].getElementsByTagName("especificacion")[0].textContent;
                let precioVisor = opcionesBat[num].getElementsByTagName("precio")[0].textContent;

                // Seleccionamos el div con id="visorimg" y cambiamos su contenido
                const visorImg = document.getElementById('visorimg');
                visorImg.innerHTML = `<img src="${imgSrc}" alt="Seleccionado" <br> <p>La batería tiene una capacidad de: ${especVisor} </p> <p>El precio de la batería es de: ${precioVisor}€ </p>`;

                // Este event listener se debería añadir solo una vez, fuera del 'forEach'
                const botonAñadirSeleccion = document.getElementById('añadirSeleccion');
                botonAñadirSeleccion.onclick = function () {
                    const seleccion = document.getElementById("selecBat");
                    // Añadir solo una vez la selección
                    if (!seleccion.innerHTML.includes("Batería")) {
                    seleccion.innerHTML += `- Batería ${especVisor} <button id="revertirSeleccionBat">Revertir bat</button>`;

                    const suma = document.getElementById("suma");
                    suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) + (parseInt(precioVisor))}€`;

                    // Botón para revertir la selección
                    const botonRevertir = document.getElementById('revertirSeleccionBat');
                    botonRevertir.addEventListener('click', function () {
                        // Vaciamos el contenido de la selección y el precio
                        const seleccion = document.getElementById("selecBat");
                        seleccion.innerHTML = '';  // Limpiar la selección

                        const suma = document.getElementById("suma");
                        
                        suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) - (parseInt(precioVisor))}€`;  // Restablecer el precio a 0€

                        // También puedes eliminar la imagen del visor
                        const visorImg = document.getElementById('visorimg');
                        visorImg.innerHTML = '';  // Limpiar la imagen seleccionada
                    });
                } else {
                    alert("¡Solo puedes añadir una batería!");
                }
            };}
        });
    });
}


let categoriaAlmacenamiento = xml.getElementsByTagName("categoria")[2];
let opcionesAlman = categoriaAlmacenamiento.getElementsByTagName("opcion");
// Recorremos todas las opciones
for (let i = 0; i < opcionesAlman.length; i++) {
    // Obtenemos la especificación y el precio de la opción actual
    let especificacion = opcionesAlman[i].getElementsByTagName("especificacion")[0].textContent;
    let precio = opcionesAlman[i].getElementsByTagName("precio")[0].textContent;

    // Ahora puedes hacer algo con estos valores, por ejemplo, mostrarlos en el HTML:
    let divEspec = document.getElementsByClassName("especAlman")[i]; // Seleccionamos el div correspondiente
    divEspec.innerHTML = ` <p class="especi"> ${especificacion} </p> <p class="presio"> ${precio}€ </p>`;
    //Parte de componente seleccionado
    const dropdownContent = document.querySelectorAll('.dropdown-content .cam, .dropdown-content .bat, .dropdown-content .Alma, .dropdown-content .MemRam, .dropdown-content .Proce, .dropdown-content .Panta, .dropdown-content .Dis');

    // Iteramos sobre ellos y añadimos el evento click
    dropdownContent.forEach(item => {
        item.addEventListener('click', function () {
            // Obtenemos la imagen dentro de cada div
            const imgSrc = this.querySelector('img').src;
            if (imgSrc.includes("imgs/almacenamientoReal.jpg")) {
                let numOp = this.querySelector('img').getAttribute('data-opcion');
                let num = numOp.charAt(6);
                let especVisor = opcionesAlman[num].getElementsByTagName("especificacion")[0].textContent;
                let precioVisor = opcionesAlman[num].getElementsByTagName("precio")[0].textContent;

                // Seleccionamos el div con id="visorimg" y cambiamos su contenido
                const visorImg = document.getElementById('visorimg');
                visorImg.innerHTML = `<img src="${imgSrc}" alt="Seleccionado" <br> <p>El almacenamiento tiene una capacidad de: ${especVisor} </p> <p>El precio del almacenamiento es de: ${precioVisor}€ </p>`;

                // Este event listener se debería añadir solo una vez, fuera del 'forEach'
                const botonAñadirSeleccion = document.getElementById('añadirSeleccion');
                botonAñadirSeleccion.onclick = function () {
                    const seleccion = document.getElementById("selecAlman");
                    // Añadir solo una vez la selección
                    if (!seleccion.innerHTML.includes("Almacenamiento")) {
                        seleccion.innerHTML += `- Almacenamiento ${especVisor} <button id="revertirSeleccionAlman">Revertir Almacenamiento</button>`;
    
                        const suma = document.getElementById("suma");
                        suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) + (parseInt(precioVisor))}€`;
    
                        // Botón para revertir la selección
                        const botonRevertir = document.getElementById('revertirSeleccionAlman');
                        botonRevertir.addEventListener('click', function () {
                            // Vaciamos el contenido de la selección y el precio
                            const seleccion = document.getElementById("selecAlman");
                            seleccion.innerHTML = '';  // Limpiar la selección
    
                            const suma = document.getElementById("suma");
                            
                            suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) - (parseInt(precioVisor))}€`;  // Restablecer el precio a 0€
    
                            // También puedes eliminar la imagen del visor
                            const visorImg = document.getElementById('visorimg');
                            visorImg.innerHTML = '';  // Limpiar la imagen seleccionada
                        });
                    } else {
                        alert("¡Solo puedes añadir un almacenamiento!");
                    }    
                    

                   
            };}
        });
    });
}



let categoriaMemoriaRam = xml.getElementsByTagName("categoria")[3];
let opcionesMemRam = categoriaMemoriaRam.getElementsByTagName("opcion");
// Recorremos todas las opciones
for (let i = 0; i < opcionesMemRam.length; i++) {
    // Obtenemos la especificación y el precio de la opción actual
    let especificacion = opcionesMemRam[i].getElementsByTagName("especificacion")[0].textContent;
    let precio = opcionesMemRam[i].getElementsByTagName("precio")[0].textContent;

    // Ahora puedes hacer algo con estos valores, por ejemplo, mostrarlos en el HTML:
    let divEspec = document.getElementsByClassName("especMemRam")[i]; // Seleccionamos el div correspondiente
    divEspec.innerHTML = ` <p class="especi"> ${especificacion} </p> <p class="presio"> ${precio}€ </p>`;

    //Parte de componente seleccionado
    const dropdownContent = document.querySelectorAll('.dropdown-content .cam, .dropdown-content .bat, .dropdown-content .Alma, .dropdown-content .MemRam, .dropdown-content .Proce, .dropdown-content .Panta, .dropdown-content .Dis');

    // Iteramos sobre ellos y añadimos el evento click
    dropdownContent.forEach(item => {
        item.addEventListener('click', function () {
            // Obtenemos la imagen dentro de cada div
            const imgSrc = this.querySelector('img').src;
            if (imgSrc.includes("imgs/memoriaRamReal.jpg")) {
                let numOp = this.querySelector('img').getAttribute('data-opcion');
                let num = numOp.charAt(6);
                let especVisor = opcionesMemRam[num].getElementsByTagName("especificacion")[0].textContent;
                let precioVisor = opcionesMemRam[num].getElementsByTagName("precio")[0].textContent;

                // Seleccionamos el div con id="visorimg" y cambiamos su contenido
                const visorImg = document.getElementById('visorimg');
                visorImg.innerHTML = `<img src="${imgSrc}" alt="Seleccionado" <br> <p>La memoria Ram tiene una capacidad de: ${especVisor} </p> <p>El precio de la memoria Ram es de: ${precioVisor}€ </p>`;

                // Este event listener se debería añadir solo una vez, fuera del 'forEach'
                const botonAñadirSeleccion = document.getElementById('añadirSeleccion');
                botonAñadirSeleccion.onclick = function () {
                    const seleccion = document.getElementById("selecRam");
                    // Añadir solo una vez la selección
                    if (!seleccion.innerHTML.includes("Memoria Ram")) {
                        seleccion.innerHTML += `- Memoria Ram ${especVisor} <button id="revertirSeleccionRam">Revertir Ram</button>`;
    
                        const suma = document.getElementById("suma");
                        suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) + (parseInt(precioVisor))}€`;
    
                        // Botón para revertir la selección
                        const botonRevertir = document.getElementById('revertirSeleccionRam');
                        botonRevertir.addEventListener('click', function () {
                            // Vaciamos el contenido de la selección y el precio
                            const seleccion = document.getElementById("selecRam");
                            seleccion.innerHTML = '';  // Limpiar la selección
    
                            const suma = document.getElementById("suma");
                            
                            suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) - (parseInt(precioVisor))}€`;  // Restablecer el precio a 0€
    
                            // También puedes eliminar la imagen del visor
                            const visorImg = document.getElementById('visorimg');
                            visorImg.innerHTML = '';  // Limpiar la imagen seleccionada
                        });
                    } else {
                        alert("¡Solo puedes añadir una Memoria Ram!");
                    }    
                    
                }
            };
        });
    });
}



let categoriaProcesador = xml.getElementsByTagName("categoria")[4];
let opcionesProce = categoriaProcesador.getElementsByTagName("opcion");
// Recorremos todas las opciones
for (let i = 0; i < opcionesProce.length; i++) {
    // Obtenemos la especificación y el precio de la opción actual
    let especificacion = opcionesProce[i].getElementsByTagName("especificacion")[0].textContent;
    let precio = opcionesProce[i].getElementsByTagName("precio")[0].textContent;

    // Ahora puedes hacer algo con estos valores, por ejemplo, mostrarlos en el HTML:
    let divEspec = document.getElementsByClassName("especProce")[i]; // Seleccionamos el div correspondiente
    divEspec.innerHTML = `<p class="especi"> ${especificacion} </p> <p class="presio"> ${precio}€ </p>`;

    //Parte de componente seleccionado
    const dropdownContent = document.querySelectorAll('.dropdown-content .cam, .dropdown-content .bat, .dropdown-content .Alma, .dropdown-content .MemRam, .dropdown-content .Proce, .dropdown-content .Panta, .dropdown-content .Dis');

    // Iteramos sobre ellos y añadimos el evento click
    dropdownContent.forEach(item => {
        item.addEventListener('click', function () {
            // Obtenemos la imagen dentro de cada div
            const imgSrc = this.querySelector('img').src;
            if (imgSrc.includes("imgs/procesadorReal.jpg")) {
                let numOp = this.querySelector('img').getAttribute('data-opcion');
                let num = numOp.charAt(6);
                let especVisor = opcionesProce[num].getElementsByTagName("especificacion")[0].textContent;
                let precioVisor = opcionesProce[num].getElementsByTagName("precio")[0].textContent;

                // Seleccionamos el div con id="visorimg" y cambiamos su contenido
                const visorImg = document.getElementById('visorimg');
                visorImg.innerHTML = `<img src="${imgSrc}" alt="Seleccionado" <br> <p>El procesador tiene una capacidad de: ${especVisor} </p> <p>El precio del procesador es de: ${precioVisor}€ </p>`;

                // Este event listener se debería añadir solo una vez, fuera del 'forEach'
                const botonAñadirSeleccion = document.getElementById('añadirSeleccion');
                botonAñadirSeleccion.onclick = function () {
                    const seleccion = document.getElementById("selecProce");
                    // Añadir solo una vez la selección
                    if (!seleccion.innerHTML.includes("Procesador")) {
                        seleccion.innerHTML += `- Procesador ${especVisor} <button id="revertirSeleccionProce">Revertir procesador</button>`;
    
                        const suma = document.getElementById("suma");
                        suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) + (parseInt(precioVisor))}€`;
    
                        // Botón para revertir la selección
                        const botonRevertir = document.getElementById('revertirSeleccionProce');
                        botonRevertir.addEventListener('click', function () {
                            // Vaciamos el contenido de la selección y el precio
                            const seleccion = document.getElementById("selecProce");
                            seleccion.innerHTML = '';  // Limpiar la selección
    
                            const suma = document.getElementById("suma");
                            
                            suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) - (parseInt(precioVisor))}€`;  // Restablecer el precio a 0€
    
                            // También puedes eliminar la imagen del visor
                            const visorImg = document.getElementById('visorimg');
                            visorImg.innerHTML = '';  // Limpiar la imagen seleccionada
                        });
                    } else {
                        alert("¡Solo puedes añadir un Procesador!");
                    } 
                }
            };
        });
    });
}



let categoriaPantalla = xml.getElementsByTagName("categoria")[5];
let opcionesPanta = categoriaPantalla.getElementsByTagName("opcion");
// Recorremos todas las opciones
for (let i = 0; i < opcionesPanta.length; i++) {
    // Obtenemos la especificación y el precio de la opción actual
    let especificacion = opcionesPanta[i].getElementsByTagName("especificacion")[0].textContent;
    let precio = opcionesPanta[i].getElementsByTagName("precio")[0].textContent;

    // Ahora puedes hacer algo con estos valores, por ejemplo, mostrarlos en el HTML:
    let divEspec = document.getElementsByClassName("especPanta")[i]; // Seleccionamos el div correspondiente
    divEspec.innerHTML = `<p class="especi"> ${especificacion} </p> <p class="presio"> ${precio}€ </p>`;

    //Parte de componente seleccionado
    const dropdownContent = document.querySelectorAll('.dropdown-content .cam, .dropdown-content .bat, .dropdown-content .Alma, .dropdown-content .MemRam, .dropdown-content .Proce, .dropdown-content .Panta, .dropdown-content .Dis');

    // Iteramos sobre ellos y añadimos el evento click
    dropdownContent.forEach(item => {
        item.addEventListener('click', function () {
            // Obtenemos la imagen dentro de cada div
            const imgSrc = this.querySelector('img').src;
            if (imgSrc.includes("imgs/pantallaReal.jpg")) {
                let numOp = this.querySelector('img').getAttribute('data-opcion');
                let num = numOp.charAt(6);
                let especVisor = opcionesPanta[num].getElementsByTagName("especificacion")[0].textContent;
                let precioVisor = opcionesPanta[num].getElementsByTagName("precio")[0].textContent;

                // Seleccionamos el div con id="visorimg" y cambiamos su contenido
                const visorImg = document.getElementById('visorimg');
                visorImg.innerHTML = `<img src="${imgSrc}" alt="Seleccionado" <br> <p>La pantalla tiene un tamaño de: ${especVisor} </p> <p>El precio de la pantalla es de: ${precioVisor}€ </p>`;

                // Este event listener se debería añadir solo una vez, fuera del 'forEach'
                const botonAñadirSeleccion = document.getElementById('añadirSeleccion');
                botonAñadirSeleccion.onclick = function () {
                    const seleccion = document.getElementById("selecPanta");
                    // Añadir solo una vez la selección
                    if (!seleccion.innerHTML.includes("Pantalla")) {
                        seleccion.innerHTML += `- Pantalla ${especVisor} <button id="revertirSeleccionPanta">Revertir Pantalla</button>`;
    
                        const suma = document.getElementById("suma");
                        suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) + (parseInt(precioVisor))}€`;
    
                        // Botón para revertir la selección
                        const botonRevertir = document.getElementById('revertirSeleccionPanta');
                        botonRevertir.addEventListener('click', function () {
                            // Vaciamos el contenido de la selección y el precio
                            const seleccion = document.getElementById("selecPanta");
                            seleccion.innerHTML = '';  // Limpiar la selección
    
                            const suma = document.getElementById("suma");
                            
                            suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) - (parseInt(precioVisor))}€`;  // Restablecer el precio a 0€
    
                            // También puedes eliminar la imagen del visor
                            const visorImg = document.getElementById('visorimg');
                            visorImg.innerHTML = '';  // Limpiar la imagen seleccionada
                        });
                    } else {
                        alert("¡Solo puedes añadir una Pantalla!");
                    } 
                }
            };
        });
    });
}



let categoriaDiseño = xml.getElementsByTagName("categoria")[6];
let opcionesDis = categoriaDiseño.getElementsByTagName("opcion");
// Recorremos todas las opciones
for (let i = 0; i < opcionesDis.length; i++) {
    // Obtenemos la especificación y el precio de la opción actual
    let especificacion = opcionesDis[i].getElementsByTagName("especificacion")[0].textContent;
    let precio = opcionesDis[i].getElementsByTagName("precio")[0].textContent;

    // Ahora puedes hacer algo con estos valores, por ejemplo, mostrarlos en el HTML:
    let divEspec = document.getElementsByClassName("especDis")[i]; // Seleccionamos el div correspondiente
    divEspec.innerHTML = `<p class="especi"> ${especificacion} </p> <p class="presio"> ${precio}€ </p>`;

    //Parte de componente seleccionado
    const dropdownContent = document.querySelectorAll('.dropdown-content .cam, .dropdown-content .bat, .dropdown-content .Alma, .dropdown-content .MemRam, .dropdown-content .Proce, .dropdown-content .Panta, .dropdown-content .Dis');

    // Iteramos sobre ellos y añadimos el evento click
    dropdownContent.forEach(item => {
        item.addEventListener('click', function () {
            // Obtenemos la imagen dentro de cada div
            const imgSrc = this.querySelector('img').src;
            if (
                imgSrc.includes("imgs/movilAzul.jpg") ||
                imgSrc.includes("imgs/movilBlanco.jpg") ||
                imgSrc.includes("imgs/movilNegro.jpg") ||
                imgSrc.includes("imgs/movilRojo.jpg") ||
                imgSrc.includes("imgs/movilRosa.jpg")
            ) {
                let numOp = this.querySelector('img').getAttribute('data-opcion');
                let num = numOp.charAt(6);
                let especVisor = opcionesDis[num].getElementsByTagName("especificacion")[0].textContent;
                let precioVisor = opcionesDis[num].getElementsByTagName("precio")[0].textContent;

                // Seleccionamos el div con id="visorimg" y cambiamos su contenido
                const visorImg = document.getElementById('visorimg');
                visorImg.innerHTML = `<img src="${imgSrc}" alt="Seleccionado" <br> <p>El diseño tiene un color: ${especVisor} </p> <p>El precio del diseño es de: ${precioVisor}€ </p>`;

                // Este event listener se debería añadir solo una vez, fuera del 'forEach'
                const botonAñadirSeleccion = document.getElementById('añadirSeleccion');
                botonAñadirSeleccion.onclick = function () {
                    const seleccion = document.getElementById("selecDis");
                    // Añadir solo una vez la selección
                    if (!seleccion.innerHTML.includes("Diseño")) {
                        seleccion.innerHTML += `- Diseño ${especVisor} <button id="revertirSeleccionDis">Revertir Diseño</button>`;
    
                        const suma = document.getElementById("suma");
                        suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) + (parseInt(precioVisor))}€`;
    
                        // Botón para revertir la selección
                        const botonRevertir = document.getElementById('revertirSeleccionDis');
                        botonRevertir.addEventListener('click', function () {
                            // Vaciamos el contenido de la selección y el precio
                            const seleccion = document.getElementById("selecDis");
                            seleccion.innerHTML = '';  // Limpiar la selección
    
                            const suma = document.getElementById("suma");
                            
                            suma.innerHTML = `${(parseInt(suma.innerHTML) || 0) - (parseInt(precioVisor))}€`;  // Restablecer el precio a 0€
    
                            // También puedes eliminar la imagen del visor
                            const visorImg = document.getElementById('visorimg');
                            visorImg.innerHTML = '';  // Limpiar la imagen seleccionada
                        });
                    } else {
                        alert("¡Solo puedes añadir un Diseño!");
                    } 
                }
            };
        });
    });
}



