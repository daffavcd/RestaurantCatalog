import RestaurantDicoding from '../../data/restaurant-dicoding';
import API_ENDPOINT from '../../globals/api-endpoint';
import UrlParser from '../../routes/url-parser';
import FavouriteButtonInitiator from '../../utils/favourite-button-initiator';

const Detail = {
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantRaw = await RestaurantDicoding.detail(url.id);
    const restaurant = restaurantRaw.restaurant;

    return `
      <div class="container first-container">
        <div class="row text-center">
          <h1>Details Utopia</h1>
        </div>
      </div>
      <div class="container p-15 flex-wrap" id="detail-content">
        <article class="card-main-detail explore-image" style="padding: 20px">
          <div class="row flex">
            <div class="card-header--detail row">
              <div class="row inline-block">
                <div class="left">
                  <h1 class="header-font">${restaurant.name}</h1>
                </div>
                <div class="right flex mt-20">
                  <div>
                    <img
                      src="./images/core/star.png"
                      alt="Star"
                      style="width: 21px"
                    />
                  </div>
                  <font class="b-18">
                    &nbsp;${restaurant.rating}<font class="f-12">/5 </font>
                  </font>
                </div>
              </div>
              <div class="row inline-block">
                <div class="left">
                  <div class="row" style="margin-top: -35px">
                    <p>${restaurant.address} , ${restaurant.city}</p>
                  </div>
                  <div class="row" style="color: #ab9e9e; margin-top: -15px">
                    <p>
                    ${restaurant.categories.map((element) => element.name)}
                    </p>
                  </div>
                </div>
                <div class="right" id="favourite-container">
                  
                  
                </div>
              </div>
            </div>
          </div>
          <div class="row relative">
            <img
              style="width: 100%"
              src="${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}"
              alt="${restaurant.name}"
            />
          </div>
          <div class="">
            <p>
              ${restaurant.description}
            </p>
          </div>
        </article>
        <article class="card--detail">
          <h2>Restaurant Menu</h2>
          <div class="row">
            <h3><i class="fas fa-cutlery"></i> FOODS</h3>
            <div class="row item-menu" id="restaurant-foods">
            ${restaurant.menus.foods
              .map(function (element) {
                return '<h4 class="golden">' + element.name + '</h4>';
              })
              .join('')}
            </div>
          </div>
          <div class="row">
            <h3><i class="fas fa-coffee"></i> DRINKS</h3>
            <div class="row item-menu" id="restaurant-drinks">
              ${restaurant.menus.drinks
                .map(function (element) {
                  return '<h4 class="golden">' + element.name + '</h4>';
                })
                .join('')}
            </div>
          </div>
        </article>
      </div>
      <div class="row text-center">
        <h1>Customer Reviews</h1>
      </div>
      <div class="container p-15" id="comment-section">
        <div class="card--comment p-15">
          <div class="row flex">
            <div>
              <i class="fas fa-user-circle" style="font-size: 50px"></i>
            </div>
            <div class="row" style="text-align: left; padding: 0px 0px 0px 15px">
              <font>You</font> <br />
              <div class="row flex">
              <form id="review-form" class="flex min-44">
                <input
                  type="text"
                  id="myComment"
                  label="WriteComment"
                  placeholder="Add your review..."
                />
                <button class="my-btn min-44" type="submit" label="InsertComment" style="margin-left: 15px;"><i class="fas fa-paper-plane"></i></button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container flex-wrap p-15" id="reviews-content">
      ${restaurant.customerReviews
        .map(function (element) {
          return `
          <div class="card--review p-15">
          <div class="row flex">
            <div>
              <i class="fas fa-user-circle" style="font-size: 50px"></i>
            </div>
            <div style="text-align: left; padding: 0px 0px 0px 15px">
              <font>${element.name}</font> <br />
              <font style="font-size: 14px; color: slategray"
                >${element.date}</font
              >
            </div>
          </div>
          <div class="row" style="text-align: left; margin-top: 10px">
            ${element.review}
          </div>
        </div>
          `;
        })
        .join('')}
      </div>
      `;
  },

  async afterRender() {
    //  adding black text navbar
    document.getElementById('my-header').classList.add('white-nav');
    document.getElementById('my-list1').classList.add('black');
    document.getElementById('my-list2').classList.add('black');
    document.getElementById('my-list3').classList.add('black');

    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantRaw = await RestaurantDicoding.detail(url.id);
    const restaurant = restaurantRaw.restaurant;

    const form = document.querySelector('#review-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const myComment = document.getElementById('myComment').value;
      const obj = {
        id: restaurant.id,
        name: 'daffavcd',
        review: myComment,
      };
      // console.log(obj);
      const reviewsResponse = await RestaurantDicoding.insert(obj);
      const reviewsContent = document.querySelector('#reviews-content');
      document.querySelector('#myComment').value = '';
      // GET INSERTED REVIEWS
      reviewsContent.innerHTML = reviewsResponse
        .map(function (element) {
          return `
          <div class="card--review p-15">
          <div class="row flex">
            <div>
              <i class="fa fa-user-circle" style="font-size: 50px"></i>
            </div>
            <div style="text-align: left; padding: 0px 0px 0px 15px">
              <font>${element.name}</font> <br />
              <font style="font-size: 14px; color: slategray"
                >${element.date}</font
              >
            </div>
          </div>
          <div class="row" style="text-align: left; margin-top: 10px">
            ${element.review}
          </div>
        </div>
          `;
        })
        .join('');
    });

    // Favourite function
    FavouriteButtonInitiator.init({
      favouriteButtonContainer: document.querySelector('#favourite-container'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        address: restaurant.address,
        city: restaurant.city,
        categories: restaurant.categories,
      },
    });
  },
};

export default Detail;
