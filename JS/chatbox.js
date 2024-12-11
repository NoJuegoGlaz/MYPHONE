document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.querySelector(".card-body"); // Contenedor donde se mostrarán los mensajes
  const sendBtn = document.getElementById("sendBtn"); // Botón de envío
  const messageInput = document.querySelector(".message-send"); // Campo de entrada para el mensaje

  // Función para agregar un mensaje al chat
  function addMessage(content, type) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box", type); // Agrega las clases 'left' o 'right' según el tipo de mensaje
    const formattedContent = content.replace(/\n/g, '<br>'); 
    const messageText = document.createElement("p");
    messageText.innerHTML = formattedContent; // Usamos innerHTML para que el navegador interprete las etiquetas <br>
    messageBox.appendChild(messageText);
    chatContainer.appendChild(messageBox); // Añade el mensaje al contenedor de mensajes
    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 0);
  }
    // Enviar el comando /reset como un mensaje al recargar la página
  function sendResetMessage() {
    const resetMessage = "/reset"; // El mensaje que quieres enviar al servidor
    
    // Datos para la solicitud a la API
    const data = {
      message: resetMessage,
      mode: "chat",
      userId: 1
    };

    // Enviar el mensaje /reset a la API
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
  }

  // Llamar a sendResetMessage para enviar el /reset cuando la página se carga
  sendResetMessage();

  // Evento para enviar el mensaje al presionar "Enter"
  messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) { // Asegura que "Enter" se presione sin Shift
      event.preventDefault(); // Evita el salto de línea
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
    }
  });

  // Evento para enviar el mensaje con el botón
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
          console.log(error);
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







 

  















