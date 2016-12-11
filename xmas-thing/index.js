const five = require('johnny-five');
const board = new five.Board();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const song = require('./piezo-jingle-bells');

let led = null;
let piezo = null;
let connected = false;

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

let setStateColor = function(state) {
  if (!connected) return;
  console.log('Someone changed the colour!', state);
  led.color({
    red: state.red,
    blue: state.blue,
    green: state.green
  });
}

let playMusic = function() {
  piezo.stop();
  if (!connected) return;
  piezo.play(song);
}

let state = {
  red: 1, green: 1, blue: 1
};

board.on('ready', function() {
  connected = true;
  piezo = new five.Piezo(9);
  led = new five.Led.RGB({
    pins: {
      red: 3,
      green: 6,
      blue: 5
    }
  });

  board.repl.inject({
    piezo: piezo
  });
});

const defaultColor = '#d8db9c';

io.on('connection', (client) => {
  client.emit('connected', defaultColor);
  client.on('join', handshake => console.log(handshake));

  client.on('play', playMusic);

  client.on('rgb', (color) => {
    const { value } = color;

    state.red = value.r;
    state.green = value.g;
    state.blue = value.b;

    // Set the new colors
    setStateColor(state);

    client.emit('rgb', value);
    client.broadcast.emit('rgb', value);
  })
});

// now: https://xmas-thing-inhtjyfibs.now.sh/

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
