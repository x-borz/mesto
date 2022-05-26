export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _sendRequest({resource, method, body = null, handler}) {
    fetch(this._baseUrl + resource, {
      headers: this._headers,
      body: body ? JSON.stringify(body) : null,
      method
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        console.log(data);
        handler(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUserInfo(handler) {
    this._sendRequest({
      resource: '/users/me',
      method: 'GET',
      handler
    });
  }

  getInitialCards(handler) {
    this._sendRequest({
      resource: '/cards',
      method: 'GET',
      handler
    });
  }

  updateUserInfo(body, handler) {
    this._sendRequest({
      resource: '/users/me',
      method: 'PATCH',
      body,
      handler
    });
  }

  addCard(body, handler) {
    this._sendRequest({
      resource: '/cards',
      method: 'POST',
      body,
      handler
    });
  }
}
