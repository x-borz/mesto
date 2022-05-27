export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _sendRequest({resource, method, body = null, handler}) {
    const headers = Object.assign({}, this._headers);

    if (body) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    }

    fetch(this._baseUrl + resource, {headers, method, body})
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

  dropCard(id, handler) {
    this._sendRequest({
      resource: '/cards/' + id,
      method: 'DELETE',
      handler
    });
  }
}
