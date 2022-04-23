import FavoriteRestaurantIdb from '../../data/favourites-restaurant';
import { createFavoritesRestaurantTemplate } from '../templates/template-creator';
const Favourites = {
  async render() {
    return `
       <div class="container first-container">
        <div class="row text-center">
          <h1>Favourites Utopias</h1>
        </div>
      </div>
      <div class="container p-15 flex-wrap container--favourites" id="favourites-content">
        
      </div>
      `;
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
