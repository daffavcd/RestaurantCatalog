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
      let stringfy = JSON.stringify(resto);
      let parsedResto = JSON.parse(stringfy);
      // console.log(stringfy);
      // console.log(parsedResto);
      // for this i don't use object cause it cannot be pass to litclass (idk i stuck for like 4hours kak)
      html += `<item-restaurant name="${resto.name}" .myresto=${parsedResto}></item-restaurant>`;
      document.getElementById('explore-content').innerHTML = html;
    });
    // const app = new ItemRestaurant({
    //   restaurant: restaurant.restaurants,
    // });
    //   restaurant.restaurants.forEach((resto) => {
    //     html += `
    // <article class="card explore-image">
    // <a href="#/detail/${resto.id}">
    // <div class="row relative">
    //   <img style="height: 315px;"
    //     src="${API_ENDPOINT.IMAGE_MEDIUM(resto.pictureId)}"
    //     alt="${resto.name}"
    //   />
    //   <div class="image-badge">${resto.city} State</div>
    // </div>
    // <div class="card-body">
    //   <div class="row inline-block">
    //     <div class="left"><h4>${resto.name}</h4></div>
    //     <div class="right flex mt-20">
    //       <div>
    //         <img
    //           src="./images/heros/star.png"
    //           alt="Star"
    //           style="width: 21px"
    //         />
    //       </div>
    //       <font class="b-18">
    //         &nbsp${resto.rating}<font class="f-12">/5 </font>
    //       </font>
    //     </div>
    //   </div>
    //   <p style="margin-top: -10px">${this.limit(resto.description, 200)}...</p>
    // </div>
    // </a>
    // </article>
    // `;
    //     document.getElementById('explore-content').innerHTML = html;
    //   });
  },

  limit(string = '', limit = 0) {
    return string.substring(0, limit);
  },
};

export default Home;
