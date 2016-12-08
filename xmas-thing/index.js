const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

const defaultColor = '#d8db9c';

io.on('connection', (client) => {
  client.emit('connected', defaultColor);
  client.on('join', handshake => console.log(handshake));

  client.on('rgb', (color) => {
    console.log('new color', color);
    client.emit('rgb', color);
  })
});

// now: https://xmas-thing-inhtjyfibs.now.sh/

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
