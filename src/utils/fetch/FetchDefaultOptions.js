

export default class FetchDefaultOptions {
  constructor() {
    // this.Post = class Post
    this.credentials = 'same-origin';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }
}
