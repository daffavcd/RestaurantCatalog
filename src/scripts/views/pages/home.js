import RestaurantDicoding from '../../data/restaurant-dicoding';
import UrlParser from '../../routes/url-parser';
// import '../../custom-elements/item-restaurant';
import { createSkeletonRestaurantTemplate } from '../templates/template-creator';
import API_ENDPOINT from '../../globals/api-endpoint';

const Home = {
  async renderBanner() {
    return `
    <div class="row" id="banner-container">
      <div class="row banner-skeleton"></div>
    </div>
        `;
  },

  async render() {
    document.getElementById('banner-container').innerHTML = `
        <picture>
            <source media="(max-width: 767px)" width="360" height="240" srcset="./images/heros/hero-image_2-small.jpg" class="dark-overlay" style="width: 100%" alt="Hero Background">
            <img
          src="./images/heros/hero-image_2-large.jpg"
          class="dark-overlay"
          width="1350"
          height="900"
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

    return `
          <div class="container">
        <div class="row text-center">
          <h1>Explore Your Utopias</h1>
        </div>
      </div>
      <div class="container p-15 flex-wrap" id="explore-content">${createSkeletonRestaurantTemplate(
        21
      )}</div>
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
    // SHADOW ROOT TREE BROKEN
    // restaurant.restaurants.forEach((resto) => {
    //   // console.log(resto.id);
    //   // for this i don't use object property on LIT cause it somehow cannot be pass to litclass (id understand i stuck for like 4hours kak :))
    //   html += `
    //   <item-restaurant id="${resto.id}" pictureId="${resto.pictureId}" name="${resto.name}" city="${resto.city}" name="${resto.name}" rating="${resto.rating}" description="${resto.description}"></item-restaurant>
    //   `;
    //   document.getElementById('explore-content').innerHTML = html;
    // });

    restaurant.restaurants.forEach((resto) => {
      html += `
  <article class="card explore-image">
  <a href="#/detail/${resto.id}">
  <div class="row relative">
    <img style="height: 315px;"
      class="lazyload"
      src="${API_ENDPOINT.IMAGE_MEDIUM(resto.pictureId)}"
      alt="${resto.name}"
    />
    <div class="image-badge">${resto.city} State</div>
  </div>
  <div class="card-body">
    <div class="row inline-block">
      <div class="left"><h4 class="restaurant-name-home">${
        resto.name
      }</h4></div>
      <div class="right flex mt-20">
        <div>
          <img
            src="./images/core/star.png"
            alt="Star"
            style="width: 21px"
          />
        </div>
        <font class="b-18">
          &nbsp${resto.rating}<font class="f-12">/5 </font>
        </font>
      </div>
    </div>
    <p style="margin-top: -10px">${this.limit(resto.description, 200)}...</p>
  </div>
  </a>
  </article>
  `;
      document.getElementById('explore-content').innerHTML = html;
    });
  },

  limit(string = '', limit = 0) {
    return string.substring(0, limit);
  },
};

export default Home;
