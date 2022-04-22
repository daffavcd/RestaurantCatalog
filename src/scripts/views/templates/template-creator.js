import CONFIG from '../../globals/config';

const createFavouriteButtonTemplate = () => `
    <button aria-label="favourite this movie" id="favourite-btn" class="my-btn">
        <i class="fa fa-plus"></i> Add to favorites
    </button>
`;

const createFavouritedButtonTemplate = () => `
    <button aria-label="unfavourite this movie" id="favourite-btn" class="my-btn">
        <i class="fa fa-minus"></i> Remove to favorites
    </button>
`;

export { createFavouriteButtonTemplate, createFavouritedButtonTemplate };
