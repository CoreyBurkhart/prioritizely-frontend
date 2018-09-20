import FetchDefaultOptions from './FetchDefaultOptions';

export default class FetchPostOptions extends FetchDefaultOptions {
  constructor(data) {
    super();
    this.body = JSON.stringify(data);
    this.method = 'POST';
  }
}
