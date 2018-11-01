import createId from '@/utils/id';

class TodoChart {
  constructor(name, id, quadrants) {
    this.name = name || 'New Chart';
    this.id = id || createId();
    this.quadrants = quadrants || [];
  }
}

export default TodoChart;
