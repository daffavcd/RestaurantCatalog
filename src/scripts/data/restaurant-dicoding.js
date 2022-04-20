import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';
class RestaurantDicoding {
  static async list() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson;
  }

  static async detail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async insert(obj) {
    const response = fetch(`${CONFIG.BASE_URL}review`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json',
      },
    });

    return response;
  }

  static async search(query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    return response.json();
  }

  static showResponseMessage(errormsg) {
    alert(errormsg);
  }
}

export default RestaurantDicoding;
