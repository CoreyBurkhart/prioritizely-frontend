import createId from '../id';

class Todo {
  constructor(value, checked, editing, id) {
    this.value = value || '';
    this.checked = checked || false;
    this.editing = editing || false;
    this.id = id || createId();
  }

  /**
   * @return {Todo}
   */
  clone() {
    return new Todo(this.value, this.checked, this.editing, this.id);
  }

  /**
   * @param {String} key
   * @param {*} value
   * @return {Todo}
   */
  updateKey(key, value) {
    const clone = this.clone();
    clone[key] = value;
    return clone;
  }
}

export default Todo;
