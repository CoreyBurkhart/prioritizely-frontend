import createId from '@/utils/id';
import Quadrant from './Quadrant';

class TodoChart {
  constructor(name, id, quadrants) {
    this.name = name || '';
    this.id = id || createId();
    this.quadrants = quadrants || [
      new Quadrant('Important'),
      new Quadrant('Not Important'),
      new Quadrant('Important and Pressing'),
      new Quadrant('Not Important and not Pressing'),
    ];
  }
}

export default TodoChart;
