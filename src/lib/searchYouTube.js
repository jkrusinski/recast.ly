var searchYouTube = (options, callback) => {
  // TODO
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    method: 'GET',
    data: {
      part: 'snippet',
      q: options.query,
      maxResults: options.max,
      key: options.key
    },
    success: callback,
    error: err => console.log(err)
  });
};

window.searchYouTube = searchYouTube;
