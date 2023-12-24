const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path'); // Aggiunto modulo path per gestire i percorsi dei file

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let richiesteMemorizzate = [];

app.use(express.static(path.join(__dirname, 'public'))); // Utilizzo di path.join per gestire i percorsi

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dj', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dj.html'));
});

app.get('/getRichieste', (req, res) => {
  res.json(richiesteMemorizzate);
});

// Endpoint per eseguire la build dei file statici (es. per React)
app.get('/build', (req, res) => {
  // Inserisci qui la logica per eseguire la build dei file statici del frontend
  // Ad esempio, se stai utilizzando React, puoi inserire qui il comando di build
  // Esempio: esegui il comando 'npm run build' o simile per generare i file statici
  // Assicurati che questa logica sia adatta al tuo progetto specifico.
});

// Gestione dell'evento di connessione per i socket
io.on('connection', (socket) => {
  console.log('Nuova connessione socket stabilita.');

  // Resto del tuo codice per gestire i socket...
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
