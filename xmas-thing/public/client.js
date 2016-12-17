$(document).ready(function() {
  // Start the socket connection
  var socket = io.connect(window.location.host);
  var isConnected = false;
  var statusElement = $('.status');
  var houseElement = $('.house');
  var playMusic = $('.play-song');

  var setHouseColour = function(colour) {
    houseElement.css('fill', colour);
  };

  var emitNewValue = function(value) {
    socket.emit('rgb', {
      value: value
    });
  };

  socket.on('rgb', function(data) {
    console.log('data is', data);
  });

  setTimeout(function() {
    if (!isConnected) statusElement.fadeIn();
  }, 5000);

  socket.on('connected', function(data) {
    houseElement.css('fill', data);
    statusElement.hide();
    isConnected = true;
  });

  socket.on('connect', function(data) {
    socket.emit('join', 'Client is connected!');
  });

  playMusic.on('click', function() {
    socket.emit('play', 'Playing song');
  });

  $('#picker').colpick({
    layout: 'RGB',
    onSubmit: function(hsb, hex, rgb, el) {
      $(el).colpickHide();
    },
    onChange:function(hsb,hex,rgb,el,bySetColor) {
      $('.house').css('fill', '#' + hex);
      emitNewValue(rgb);
    }
  });
});
