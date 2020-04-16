$(document).ready(function() {
  const newsCard = $('.news .blog > div'),
    newsLoadMoreButton = $('.news #load-more-button');
  const piece = newsCard.length;
  let x = 7;
  const limit = 6;

  newsCard.slice(0, x).show();

  newsLoadMoreButton.on('click', function(e) {
    e.preventDefault();
    x = (x + limit <= piece) ? x + limit : piece;
    newsCard.slice(0, x).show();

    if (x === piece) {
      newsLoadMoreButton.hide();
    }
  });

  if (x >= piece) {
    newsLoadMoreButton.hide();
  }
});
