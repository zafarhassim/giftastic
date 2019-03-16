// Event listener for all buttons on the page
$(document).ready(function() {
  function addEmotions(results) {
    for (var i = 0; i < results.length; i++) {
      var emotionDiv = $('<div class="item ">');
      // Storing the result item's rating
      var rating = results[i].rating;
      var p = $('<p class="label label-primary">').text('Rating: ' + rating);

      var emotionImage = $('<img>').attr('class', 'gif-img');

      emotionImage.attr('src', results[i].images.fixed_height.url);
      emotionImage.attr('data-still', results[i].images.fixed_height_still.url);
      emotionImage.attr('data-animate', results[i].images.fixed_height.url);

      emotionDiv.append(p);
      emotionDiv.append(emotionImage);
      $('#gif-session').prepend(emotionDiv);
    }

    $('.gif-img').on('click', function() {
      var state = $(this).attr('data-state');
      console.log(this);

      if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state ', 'animate ');
      } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
      }
    });
  }

  $('button').on('click', function() {
    var emotion = $(this).attr('data-emotion');

    // URL to search Giphy and use my key
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' + emotion + '&api_key=tnLJTJdQDz9IyKxbezLt8rkUHZ02Ta0s&limit=10';

    // AJAX call
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      // Store an array of results in the results variable
      var results = response.data;
      //   console.log(results);

      addEmotions(results);
    });
  });

  // Search form
  $('#submit-btn').on('click', function(event) {
    var searchBtn = $('#gif-input').val();
    event.preventDefault();
    // console.log(searchInput)

    // Create new button to that emotion
    var newEmotionBtn = $('<button>')
      .attr('class', 'btn btn-primary')
      .attr('data-emotion', 'searchInput')
      .html(searchBtn);

    $('#emotions').append(newEmotionBtn);

    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' + searchBtn + '&api_key=tnLJTJdQDz9IyKxbezLt8rkUHZ02Ta0s&limit=10';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      var results = response.data;

      addEmotions(results);
    });
    $('#gif-input ').val(' ');
    return false;
  });
});
