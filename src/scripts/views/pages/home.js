import RestaurantDicoding from '../../data/restaurant-dicoding';
import API_ENDPOINT from '../../globals/api-endpoint';
import UrlParser from '../../routes/url-parser';
import ItemRestaurant from '../../custom-elements/item-restaurant';

const Home = {
  async renderBanner() {
    return `
           <img
          src="./images/heros/hero-image_2.jpg"
          class="dark-overlay"
          style="width: 100%"
          alt="Hero Background"
        />
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
      <div class="container p-15 flex-wrap" id="explore-content"></div>
      <div class="container">
        <div class="row text-center p-15">
          <h1>in a collaboration with</h1>
        </div>
      </div>
      <div class="container p-15">
        <div class="text-center relative row" style="margin-bottom: 35px">
          <img
            src="./images/heros/starbucks.png"
            class="starbuck-overlay"
            style="width: 500px; margin: auto"
            alt="Starbucks"
          />
        </div>
      </div>
        `;
  },

  async afterRender() {
    //remove black text navbar & activate scroll window action

    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log(url);

    document.getElementById('my-header').classList.remove('white-nav');
    document.getElementById('my-list1').classList.remove('black');
    document.getElementById('my-list2').classList.remove('black');
    document.getElementById('my-list3').classList.remove('black');

    var myNav = document.getElementById('my-header');
    var listku1 = document.getElementById('my-list1');
    var listku2 = document.getElementById('my-list2');
    var listku3 = document.getElementById('my-list3');

    window.onscroll = function () {
      'use strict';
      if (
        document.body.scrollTop >= 280 ||
        document.documentElement.scrollTop >= 280
      ) {
        myNav.classList.add('white-nav');
        listku1.classList.add('black');
        listku2.classList.add('black');
        listku3.classList.add('black');
      } else {
        myNav.classList.remove('white-nav');
        listku1.classList.remove('black');
        listku2.classList.remove('black');
        listku3.classList.remove('black');
      }
    };

    const restaurant = await RestaurantDicoding.list();
    let html = '';
    restaurant.restaurants.forEach((resto) => {
      // for this i don't use object cause it cannot be pass to litclass (idu i stuck for like 4hours kak)
      html += `<item-restaurant id="${resto.id}" pictureId="${resto.pictureId}" name="${resto.name}" city="${resto.city}" name="${resto.name}" rating="${resto.rating}" description="${resto.description}"></item-restaurant>`;
      document.getElementById('explore-content').innerHTML = html;
    });
  },
};

export default Home;
