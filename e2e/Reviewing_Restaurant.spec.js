Feature('Reviewing Restaurants');
// const assert = require('assert');

Scenario('reviewing restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.wait(3);
  I.seeElement('.card a');
  I.click(locate('.card a').first());

  I.waitForElement('#myComment', 3);
  I.seeElement('#myComment');
  const userReview = 'This is At-Test3';
  I.fillField('#myComment', userReview);
  I.click('#insert-review-btn');
  I.wait(3);

  //  CANNOT GETTING THE LAST DIV TEXT
  //   I.amOnPage('/#/detail/rqdv5juczeskfw1e867');
  //   I.wait(3);
  //   I.seeElement(locate('.users-review').withText(userReview));
  //   I.see('This is At-Test', '.users-review');
  //   const getLastReview = await I.grabTextFrom(
  //     locate('.users-review').withText(userReview)
  //   );
  //   console.log(getLastReview);
  // const getLastReview = await I.grabTextFrom(
  //   locate('#reviews-content .card--review .users-review').last()
  // );
  // codecept_debug(getLastReview);
  //   //   alert(getLastReview);
  //   assert.strictEqual(userReview, getLastReview);
  //   I.see(getLastReview, '#reviews-content .card--review .users-review');
  //   I.seeElement(locate('#reviews-content .card--review .users-review').last());
});
