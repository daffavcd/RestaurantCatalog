import FavoriteRestaurantIdb from '../../data/favourites-restaurant';
import { createFavoritesRestaurantTemplate } from '../templates/template-creator';
const Favourites = {
  async render() {
    const restaurant = await FavoriteRestaurantIdb.getAllRestaurants();
    if (restaurant.length == 0) {
      return `
      <div class="container first-container">
       <div class="row text-center">
         <h1>Favourites Utopia</h1>
       </div>
     </div>
     <div class="container p-15 flex-wrap container--favourites text-center" id="favourites-content">
        <div class="row text-center restaurant-favourited__none"><h4 id="restaurant-favourited__none">You haven't favourited any restaurant.</h4></div>
     </div>
     `;
    } else {
      return `
      <div class="container first-container">
       <div class="row text-center">
         <h1>Favourites Utopia</h1>
       </div>
     </div>
     <div class="container p-15 flex-wrap container--favourites" id="favourites-content">
       
     </div>
     `;
    }
  },

  async afterRender() {
    //  adding black text navbar
    document.getElementById('my-header').classList.add('white-nav');
    document.getElementById('my-list1').classList.add('black');
    document.getElementById('my-list2').classList.add('black');
    document.getElementById('my-list3').classList.add('black');

    //  --------------
    const restaurant = await FavoriteRestaurantIdb.getAllRestaurants();
    const favouritesContainer = document.querySelector('#favourites-content');
    restaurant.forEach((resto) => {
      favouritesContainer.innerHTML += createFavoritesRestaurantTemplate(resto);
    });
  },
};

export default Favourites;
