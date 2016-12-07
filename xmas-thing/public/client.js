$(document).ready(function() {
  $('#picker').colpick({
    layout: 'RGB',
    onSubmit: function(hsb, hex, rgb, el) {
      $(el).colpickHide();
    },
    onChange:function(hsb,hex,rgb,el,bySetColor) {
      $(el).children().css('background', '#' + hex);
    }
  });
});
