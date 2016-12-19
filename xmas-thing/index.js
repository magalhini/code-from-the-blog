const five = require('johnny-five');
const board = new five.Board();
const express = require('express');

// Create the local server
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

// Instructions for the Xmas song
const song = require('./piezo-jingle-bells');

let led = null;
let piezo = null;
let connected = false;

// Serve the client side files to the express server
app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

// Change the colour of the LED based on the colour picker object
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

// The initial state for the colors
let state = { red: 1, green: 1, blue: 1 };

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

  // Instantiante the piezo (music) piece
  board.repl.inject({
    piezo: piezo
  });
});

const defaultColor = '#d8db9c';

io.on('connection', (client) => {
  client.emit('connected', defaultColor);

  // When the client sends a "play" event, request the annoying song to be played
  client.on('play', playMusic);

  // The meat of the app: the "rgb" event sent by the colour picker
  client.on('rgb', (color) => {
    const { value } = color;

    state.red = value.r;
    state.green = value.g;
    state.blue = value.b;

    // Set the new colors
    setStateColor(state);

    client.emit('rgb', value);

    // By broadcasting the new value, everyone who's connected to the page
    // will also see the value being updated when someone else changes it.
    client.broadcast.emit('rgb', value);
  });
});

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
