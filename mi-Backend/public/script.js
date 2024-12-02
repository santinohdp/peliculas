document.addEventListener('DOMContentLoaded', function() {

    // Manejo de formulario de inicio de sesión
    document.getElementById('login-form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Obtener valores de los campos
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
  
      // Verificar si los campos no están vacíos
      if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
      }
  
      // Enviar solicitud al backend
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Asegúrate de que se está enviando como JSON
        },
        body: JSON.stringify({ email, password })  // Enviar email y password como JSON
      })
      .then(response => {
        if (!response.ok) {
          // Si el servidor responde con un error, mostrarlo
          return Promise.reject("Error en la solicitud: " + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Si la respuesta del servidor indica éxito
        if (data.success) {
          window.location.href = '/home';  // Redirigir a la página de inicio
        } else {
          document.getElementById('error-message').style.display = 'block'; // Mostrar mensaje de error
        }
      })
      .catch(error => {
        console.error(error);
      });
    });
  
    // Manejo de formulario de registro
    document.getElementById('register-form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Obtener valores de los campos
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
  
      // Verificar que las contraseñas coincidan
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }
  
      // Enviar solicitud al backend
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Cuenta creada exitosamente!');
          window.location.href = '/login'; // Redirigir a la página de inicio de sesión
        } else {
          alert('Error al crear la cuenta.');
        }
      })
      .catch(error => {
        console.error('Error en el registro:', error);
      });
    });
  
    // Cambio entre login y registro
    document.getElementById('switch-to-register').addEventListener('click', function() {
      document.getElementById('auth-container').classList.add('register-mode');
    });
  
    document.getElementById('switch-to-login').addEventListener('click', function() {
      document.getElementById('auth-container').classList.remove('register-mode');
    });
  });
  