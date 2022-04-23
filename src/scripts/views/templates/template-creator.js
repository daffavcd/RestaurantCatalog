import apiEndpoint from '../../globals/api-endpoint';

const createFavouriteButtonTemplate = () => `
    <button aria-label="favourite this movie" id="favourite-btn" class="my-btn min-44">
        <i class="fa fa-plus">
        </i> Add to favorites
    </button>
`;

const createFavouritedButtonTemplate = () => `
    <button aria-label="unfavourite this movie" id="favourite-btn" class="my-btn min-44">
        <i class="fa fa-minus">
        </i> Remove to favorites
    </button>
`;

const createFavoritesRestaurantTemplate = (resto) => `
    <article class="card--favourites explore-image">
          <a href="#/detail/${resto.id}">
            <div class="row flex row--favourites">
              <div>
                <img
                  style="width: 450px; border-radius: 5px 0px 0px 5px"
                  src="${apiEndpoint.IMAGE_MEDIUM(resto.pictureId)}"
                  alt="${resto.name}"
                />
              </div>
              <div
                class="row"
                style="text-align: left; padding: 10px 0px 0px 15px"
              >
                <font class="header--favourites">${resto.name}</font>
                <br />
                <div class="flex" style="margin-top: 10px">
                  <div>
                    <img
                      src="./images/heros/star.png"
                      alt="Star"
                      style="width: 18px"
                    />
                  </div>
                  <font class="b-18">
                    &nbsp;${resto.rating}<font class="f-12">/5 </font>
                  </font>
                </div>
                <div class="row" style="margin-top: -15px">
                  <p>${resto.address}, ${resto.city}</p>
                </div>
                <div class="row" style="color: #ab9e9e; margin-top: -15px">
                  <p>${resto.categories.map((element) => element.name)}</p>
                </div>
              </div>
            </div>
          </a>
    </article>
`;

export {
  createFavouriteButtonTemplate,
  createFavouritedButtonTemplate,
  createFavoritesRestaurantTemplate,
};
