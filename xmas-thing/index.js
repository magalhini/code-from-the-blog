const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
