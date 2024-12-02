const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para leer datos del cuerpo de la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Crear un transporte de correo con nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// Ruta para registrar el usuario y enviar correo
app.post('/register', (req, res) => {
    const { email } = req.body;

    // Aquí puedes agregar tu lógica de registro de usuario (guardar en base de datos, etc.)

    // Configuración del correo
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Bienvenido a nuestro servicio',
        text: 'Gracias por registrarte en nuestro servicio. ¡Estamos felices de tenerte con nosotros!'
    };

    // Enviar correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el correo.');
        }
        res.status(200).send('¡Cuenta registrada con éxito y correo enviado!');
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
