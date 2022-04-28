import RestaurantDicoding from './../src/scripts/data/restaurant-dicoding';
import FavoriteRestaurantIdb from './../src/scripts/data/favourites-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('Unfavouriting A Restaurant -', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favourite-container"></div>';
  };

  const idRestaurant = 'rqdv5juczeskfw1e867';

  beforeEach(async () => {
    const restaurantRaw = await RestaurantDicoding.detail(idRestaurant);
    const restaurant = restaurantRaw.restaurant;
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({
      id: restaurant.id,
      name: restaurant.name,
      pictureId: restaurant.pictureId,
      rating: restaurant.rating,
      address: restaurant.address,
      city: restaurant.city,
      categories: restaurant.categories,
    });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(idRestaurant);
  });

  it('should show the unfavourite button when the restaurant has favourited', async () => {
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
    ).toBeTruthy();
  });

  it('should not show the favourite button when the restaurant has favourited', async () => {
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
    ).toBeFalsy();
  });

  it('should be able to remove favourited restaurant from the list', async () => {
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

    document
      .querySelector('[aria-label="unfavourite this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unfavourited restaurant is not in the list', async () => {
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

    // hapus dulu resto dari daftar resto yang disukai
    await FavoriteRestaurantIdb.deleteRestaurant(idRestaurant);

    // kemudian, simulasikan pengguna menekan widget batal menfaforiti resto
    document
      .querySelector('[aria-label="unfavourite this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
