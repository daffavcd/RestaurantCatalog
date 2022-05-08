import RestaurantDicoding from '../../data/restaurant-dicoding';
import UrlParser from '../../routes/url-parser';
import '../../custom-elements/item-restaurant';
import { createSkeletonRestaurantTemplate } from '../templates/template-creator';

const Home = {
  async renderBanner() {
    return `
        <picture>
            <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.jpg" class="dark-overlay" style="width: 100%" alt="Hero Background">
            <img
          src="./images/heros/hero-image_2-large.jpg"
          class="dark-overlay"
          style="width: 100%"
          alt="Hero Background"
        />
        </picture>
           
        <div class="centered">
          <font class="text-head">My Desired Utopias</font><br />
          <font class="text-head2"
            >there is a fragmentary of neverland for sure.</font
          >
        </div>
        `;
  },

  async render() {
    return `
          <div class="container">
        <div class="row text-center">
          <h1>Explore Your Utopias</h1>
        </div>
      </div>
      <div class="container p-15 flex-wrap" id="explore-content">${createSkeletonRestaurantTemplate(21)}</div>
      <div class="container">
        <div class="row text-center p-15">
          <h1>in a collaboration with</h1>
        </div>
      </div>
      <div class="container p-15">
        <div class="text-center relative row" style="margin-bottom: 35px">
          <img
            src="./images/core/starbucks.png"
            class="starbuck-overlay lazyload"
            style="width: 500px; margin: auto"
            alt="Starbucks"
          />
        </div>
      </div>
        `;
  },

  async afterRender() {
    //  remove black text navbar & activate scroll window action

    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log(url);

    document.getElementById('my-header').classList.remove('white-nav');
    document.getElementById('my-list1').classList.remove('black');
    document.getElementById('my-list2').classList.remove('black');
    document.getElementById('my-list3').classList.remove('black');

    JsLoadingOverlay.show();
    const restaurant = await RestaurantDicoding.list();
    JsLoadingOverlay.hide();

    let html = '';
    restaurant.restaurants.forEach((resto) => {
      // console.log(resto.id);
      // for this i don't use object property on LIT cause it somehow cannot be pass to litclass (id understand i stuck for like 4hours kak :))
      html += `
      <item-restaurant id="${resto.id}" pictureId="${resto.pictureId}" name="${resto.name}" city="${resto.city}" name="${resto.name}" rating="${resto.rating}" description="${resto.description}"></item-restaurant>
      `;
      document.getElementById('explore-content').innerHTML = html;
    });
  },

  limit(string = '', limit = 0) {
    return string.substring(0, limit);
  },
};

export default Home;
