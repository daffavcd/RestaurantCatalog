import FavouriteButtonInitiator from './../src/scripts/utils/favourite-button-initiator';
import RestaurantDicoding from './../src/scripts/data/restaurant-dicoding';
import FavoriteRestaurantIdb from './../src/scripts/data/favourites-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('Favouriting A Restaurant -', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favourite-container"></div>';
  };
  beforeEach(() => {
    addLikeButtonContainer();
  });
  const idRestaurant = 'rqdv5juczeskfw1e867';

  it('should show the favourite button when the restaurant has not been favourited before', async () => {
    const restaurantRaw = await RestaurantDicoding.detail(idRestaurant);
    const restaurant = restaurantRaw.restaurant;
    await TestFactories.createFavouritedButtonPresenterWithRestaurant({
      id: restaurant.id,
      name: restaurant.name,
      pictureId: restaurant.pictureId,
      rating: restaurant.rating,
      address: restaurant.address,
      city: restaurant.city,
      categories: restaurant.categories,
    });

    expect(
      document.querySelector('[aria-label="favourite this restaurant"]')
    ).toBeTruthy();
  });

  it('should not show the unfavourite button when the restaurant has not been favourited before', async () => {
    const restaurantRaw = await RestaurantDicoding.detail(idRestaurant);
    const restaurant = restaurantRaw.restaurant;
    await TestFactories.createFavouritedButtonPresenterWithRestaurant({
      id: restaurant.id,
      name: restaurant.name,
      pictureId: restaurant.pictureId,
      rating: restaurant.rating,
      address: restaurant.address,
      city: restaurant.city,
      categories: restaurant.categories,
    });

    expect(
      document.querySelector('[aria-label="unfavourite this restaurant"]')
    ).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    const restaurantRaw = await RestaurantDicoding.detail(idRestaurant);
    const restaurant = restaurantRaw.restaurant;
    await TestFactories.createFavouritedButtonPresenterWithRestaurant({
      id: restaurant.id,
      name: restaurant.name,
      pictureId: restaurant.pictureId,
      rating: restaurant.rating,
      address: restaurant.address,
      city: restaurant.city,
      categories: restaurant.categories,
    });
    document.querySelector('#favourite-btn').dispatchEvent(new Event('click'));
    const savedRestaurant = await FavoriteRestaurantIdb.getRestaurant(
      idRestaurant
    );
    expect(savedRestaurant).toEqual({
      id: restaurant.id,
      name: restaurant.name,
      pictureId: restaurant.pictureId,
      rating: restaurant.rating,
      address: restaurant.address,
      city: restaurant.city,
      categories: restaurant.categories,
    });
    FavoriteRestaurantIdb.deleteRestaurant(idRestaurant);
  });

  it('should remove restaurant andshould not add a restaurant again when its already favourited', async () => {
    const restaurantRaw = await RestaurantDicoding.detail(idRestaurant);
    const restaurant = restaurantRaw.restaurant;
    await TestFactories.createFavouritedButtonPresenterWithRestaurant({
      id: restaurant.id,
      name: restaurant.name,
      pictureId: restaurant.pictureId,
      rating: restaurant.rating,
      address: restaurant.address,
      city: restaurant.city,
      categories: restaurant.categories,
    });

    // Tambahkan resto dengan ID 1 ke daftar resto yang disukai
    await FavoriteRestaurantIdb.putRestaurant({ id: idRestaurant });
    // Simulasikan pengguna menekan tombol suka resto
    document.querySelector('#favourite-btn').dispatchEvent(new Event('click'));
    // tidak ada restaurant yang ganda
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([
      {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        address: restaurant.address,
        city: restaurant.city,
        categories: restaurant.categories,
      },
    ]);

    FavoriteRestaurantIdb.deleteRestaurant(idRestaurant);
  });

  it('should not add a restaurant when it has no id/data', async () => {
    await FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favourite-container'),
      restaurant: {},
    });

    document.querySelector('#favourite-btn').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
