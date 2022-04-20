import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  SEARCH: (query) => `${CONFIG.BASE_URL}search?q=${query}`,
  IMAGE_MEDIUM: (pictureId) => `${CONFIG.BASE_IMAGE_URL}medium/${pictureId}`,
  IMAGE_LARGE: (pictureId) => `${CONFIG.BASE_IMAGE_URL}large/${pictureId}`,
};

export default API_ENDPOINT;
