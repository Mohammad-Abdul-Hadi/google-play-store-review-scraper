var gplay = require('google-play-scraper');

gplay.app({appId: 'younow.live'})
  .then((result) => {
    console.log(result.reviews);
  });