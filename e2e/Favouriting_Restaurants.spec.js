Feature('Favouriting Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favourites');
});

Scenario('liking one movie', ({ I }) => {
  // I.seeElement('#favourites-content');
  I.amOnPage('/');
  I.seeElement('.left h4');
});
