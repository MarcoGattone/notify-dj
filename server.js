const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let richiesteMemorizzate = [];

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/dj', (req, res) => {
  res.sendFile(__dirname + '/dj.html');
});

app.get('/getRichieste', (req, res) => {
  res.json(richiesteMemorizzate);
});

// Gestione dell'evento di connessione per i socket
io.on('connection', (socket) => {
  console.log('Nuova connessione socket stabilita.');

  // Gestione della ricezione di una nuova richiesta
  socket.on('nuovaRichiesta', (data) => {
    console.log(`Nuova richiesta ricevuta: ${data.canzone} da ${data.nome} - YouTube: ${data.youtube} - Dedica: ${data.dedica}`);

    // Aggiungiamo la nuova richiesta all'array delle richieste
    richiesteMemorizzate.push(data);

    // Emittiamo l'aggiornamento a tutti i client, compreso il DJ
    io.emit('aggiornaRichieste', data);
  });

  // Gestione dell'eliminazione di una richiesta singola
  socket.on('eliminaRichiesta', (id) => {
    richiesteMemorizzate.splice(id, 1);
    io.emit('aggiornaRichieste', richiesteMemorizzate);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
