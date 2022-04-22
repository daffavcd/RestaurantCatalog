import FavoriteRestaurantIdb from '../data/favourites-restaurant';
import {
  createFavouriteButtonTemplate,
  createFavouritedButtonTemplate,
} from '../views/templates/template-creator';

const FavouriteButtonInitiator = {
  async init({ favouriteButtonContainer, restaurant }) {
    this._favouriteButtonContainer = favouriteButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isrestaurantExist(id)) {
      this._renderFavorited();
    } else {
      this._renderFavorite();
    }
  },

  async _isrestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderFavorite() {
    this._favouriteButtonContainer.innerHTML = createFavouriteButtonTemplate();

    const likeButton = document.querySelector('#favourite-btn');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderFavorited() {
    this._favouriteButtonContainer.innerHTML = createFavouritedButtonTemplate();

    const likeButton = document.querySelector('#favourite-btn');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default FavouriteButtonInitiator;
