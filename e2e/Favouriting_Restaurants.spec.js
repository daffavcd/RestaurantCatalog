Feature('Favouriting Restaurants');
const assert = require('assert');
Scenario('showing favourited restaurant is none', ({ I }) => {
  I.amOnPage('/#/favourites');
  I.waitForElement('#restaurant-favourited__none', 3);
  I.see(
    "You haven't favourited any restaurant.",
    '#restaurant-favourited__none'
  );
});

Scenario('favouriting restaurant and then unfavouriting it', async ({ I }) => {
  I.amOnPage('/');

  I.wait(3);
  I.seeElement('.card a');
  const firstRestaurant = locate('.restaurant-name-home').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(locate('.card a').first());

  I.waitForElement('#favourite-btn', 3);
  I.seeElement('#favourite-btn');
  I.click('#favourite-btn');

  I.amOnPage('/#/favourites');
  I.seeElement('.card--favourites');
  const favouritedRestaurantTitle = await I.grabTextFrom('.header--favourites');
  assert.strictEqual(firstRestaurantTitle, favouritedRestaurantTitle);

  //  unfavouriting it
  I.seeElement('.card--favourites a');
  I.click(locate('.card--favourites a').first());

  I.waitForElement('#favourite-btn', 3);
  I.seeElement('#favourite-btn');
  I.click('#favourite-btn');

  I.amOnPage('/#/favourites');
  I.dontSeeElement('.card--favourites');
});
