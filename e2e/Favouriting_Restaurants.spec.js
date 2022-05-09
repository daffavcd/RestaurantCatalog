Feature('Favouriting Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favourites');
});

// Scenario('showing favourited restaurant is none', ({ I }) => {
//   I.waitForElement('#restaurant-favourited__none', 3);
//   I.see("You haven't favourited any restaurant.", '#restaurant-favourited__none');
// });

Scenario('favouriting restaurant', ({ I }) => {
  I.amOnPage('/');
  I.wait(4);
  // I.click({ shadow: ['item-restaurant', 'article', 'a'] });
  I.seeElement({ shadow: ['item-restaurant' ]});
  // I.click(locate('.card a').first());
});
