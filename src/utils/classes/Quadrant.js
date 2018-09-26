import createId from '@/utils/id';

class Quadrant {
  constructor(name, id, items) {
    this.name = name || '';
    this.id = id || createId();
    this.items = items || [];
  }
}

export default Quadrant;
