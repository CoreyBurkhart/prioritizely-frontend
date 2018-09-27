import createId from '../id';

class Todo {
  constructor(value, checked, editing, id) {
    this.value = value || '';
    this.checked = checked || false;
    this.editing = editing || false;
    this.id = id || createId();
  }
}

export default Todo;
