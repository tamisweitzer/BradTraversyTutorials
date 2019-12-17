
var audio;

// Hide pause button
$('#pause').hide();

// Initialize
initAudio($('#playlist li:first-child'));

// Play button
$('#play').click(function() {
  audio.play();
  $('#play').hide();
  $('#pause').show();
  $('#duration').fadeIn(400);
  showDuration();
});

// Pause button
$('#pause').click(function() {
  audio.pause();
  $('#pause').hide();
  $('#play').show();
  $('#duration').fadeOut(400);
});

// Stop button
$('#stop').click(function() {
  audio.pause();
  audio.currentTime = 0;
  $('#pause').hide();
  $('play').show();
});

// Next button
$('#next').click(function() {
  audio.pause();
  var next = $('#playlist li.active').next();
  if (next.length == 0) {
    next = $('#playlist li:first-child');
  }
  initAudio(next);
  audio.play();
  showDuration();
});

// Previous button
$('#previous').click(function() {
  audio.pause();
  var previous = $('#playlist li.active').prev();
  if (previous.length == 0) {
    previous = $('#playlist li:last-child');
  }
  initAudio(previous);
  audio.play();
  showDuration();
});


// Volume Control
$('#volume').change(function() {
  audio.volume = parseFloat(this.value / 10);
})

// Time Duration
function showDuration() {
  $(audio).bind('timeupdate', function() {
    // Get hours and minutes
    var s = parseInt(audio.currentTime % 60),
        m = parseInt((audio.currentTime / 60) % 60);

        // Pad with 0 if less than 10
        if (s < 10 ) {
          s = '0' + s;
        }

        $('#duration').html(m + ' : ' + s);
        var value = 0;
        if (audio.currentTime > 0) {
          value = Math.floor((100 / audio.duration) * audio.currentTime);
        }

        $('#progress').css('width', value + '%');
  })
}

// Initalizer Funcion
function initAudio(element) {
  var song = element.attr('song'),
      title = element.text(),
      cover = element.attr('cover'),
      artist = element.attr('artist');

  // Create audio object
  audio = new Audio('media/' + song);

  if (!audio.currentTime) {
    $('#duration').html('0.00');
  }

  $('#audio-player .title').text(title);
  $('#audio-player .artist').text(artist);

  // Insert cover image
  $('img.cover').attr('src', 'img/' + cover);

  // Remove active class of last song and put it on this One
  $('#playlist li').removeClass('active');
  element.addClass('active');
}
