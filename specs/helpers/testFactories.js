import FavouriteButtonInitiator from '../../src/scripts/utils/favourite-button-initiator';

const createFavouritedButtonPresenterWithRestaurant = async (restaurant) => {
  await FavouriteButtonInitiator.init({
    favouriteButtonContainer: document.querySelector('#favourite-container'),
    restaurant,
  });
};

export { createFavouritedButtonPresenterWithRestaurant };
