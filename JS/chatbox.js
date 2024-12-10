document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.querySelector(".messages-container"); // Contenedor donde se mostrarán los mensajes
  const sendBtn = document.getElementById("sendBtn"); // Botón de envío
  const messageInput = document.querySelector(".message-send"); // Campo de entrada para el mensaje

  // Función para agregar un mensaje al chat
  function addMessage(content, type) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box", type); // Agrega las clases 'left' o 'right' según el tipo de mensaje
    const messageText = document.createElement("p");
    messageText.textContent = content; // El contenido del mensaje
    messageBox.appendChild(messageText);
    chatContainer.appendChild(messageBox); // Añade el mensaje al contenedor de mensajes
    chatContainer.scrollTop = chatContainer.scrollHeight; // Baja automáticamente al último mensaje
  }

  // Evento para enviar el mensaje
  sendBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    const message = messageInput.value.trim(); // Obtiene el texto del campo de entrada

    if (message !== "") {
      addMessage(message, "right"); // Agrega el mensaje al chat (tipo 'right' indica que es un mensaje enviado)
      messageInput.value = ""; // Limpia el campo de entrada después de enviar el mensaje

      // Datos para la solicitud a la API
      const data = {
        message: message,
        mode: "chat",
        userId: 1
      };

      // Enviar mensaje a la API
      fetch('http://localhost:3001/api/v1/workspace/e/thread/Hola0/chat', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YHTFFMW-917M4YP-G3H5HGA-04R7EWH'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
          }
          return response.json();
        })
        .then(responseData => {
          // Respuesta de la API, agrega el mensaje de la API al chat
          if (responseData && responseData.textResponse) {
            addMessage(responseData.textResponse, "left"); // "left" indica que es una respuesta recibida
          }
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });
    } else {
      console.warn("El campo de texto está vacío, no se enviará el mensaje.");
    }
  });
});





fetch('http://localhost:3001/api/v1/auth', {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Authorization': 'Bearer YHTFFMW-917M4YP-G3H5HGA-04R7EWH' 
  }
})
.then(response => { 
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);   
  }
  return response.json();
})
.then(data => console.log(data)) // Procesa la respuesta aquí
.catch(error => console.error('Error:', error));
/*
// Generar un nombre único con la fecha y hora actual
var contador= 0;
var contador = contador; // Obtiene un timestamp único
const cliente =`Hola`+contador;  // Ejemplo: cliente-1608234387773
const clienteHilo=`Hola`+contador;

fetch('http://localhost:3001/api/v1/workspace/e/thread/new', {
  method: 'POST', 
  headers: {
    'accept': 'application/json',      
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YHTFFMW-917M4YP-G3H5HGA-04R7EWH' 
  }, 
  body: JSON.stringify({
    userId: 1,               
    name: cliente,       
    slug: clienteHilo       
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();  
})
.then(data => console.log(data))  
.catch(error => console.error('Error:', error));  
*/







 

  















