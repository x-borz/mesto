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

    return fetch(this._baseUrl + resource, {headers, method, body})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        handler(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUserInfo(handler) {
    return this._sendRequest({
      resource: '/users/me',
      method: 'GET',
      handler
    });
  }

  getInitialCards(handler) {
    return this._sendRequest({
      resource: '/cards',
      method: 'GET',
      handler
    });
  }

  updateUserInfo(body, handler) {
    return this._sendRequest({
      resource: '/users/me',
      method: 'PATCH',
      body,
      handler
    });
  }

  addCard(body, handler) {
    return this._sendRequest({
      resource: '/cards',
      method: 'POST',
      body,
      handler
    });
  }

  dropCard(id, handler) {
    return this._sendRequest({
      resource: '/cards/' + id,
      method: 'DELETE',
      handler
    });
  }

  addLike(id, handler) {
    return this._sendRequest({
      resource: '/cards/' + id + '/likes',
      method: 'PUT',
      handler
    });
  }

  removeLike(id, handler) {
    return this._sendRequest({
      resource: '/cards/' + id + '/likes',
      method: 'DELETE',
      handler
    });
  }

  updateAvatar(link, handler) {
    return this._sendRequest({
      resource: '/users/me/avatar',
      method: 'PATCH',
      body: {
        avatar: link
      },
      handler
    });
  }
}
