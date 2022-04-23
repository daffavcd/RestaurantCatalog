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
    const response = await fetch(`${CONFIG.BASE_URL}review`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Data gagal ditambahkan!');
      })
      .then((res) => res.customerReviews)
      .catch((error) => {
        console.log(error);
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
