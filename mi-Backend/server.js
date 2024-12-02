const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Servir archivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Enviar el index.html cuando se accede a la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
