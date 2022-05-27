export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  setUserInfo({userId, name, job}) {
    this._userId = userId;
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  setAvatar(link) {
    this._avatarElement.src = link;
  }

  getUserId() {
    return this._userId;
  }
}
