export default {
  activeChartId: 'chart1',
  charts: {
    chart1: {
      name: 'test chart',
      id: 'chart1',
      quadrants: ['quadrant1', 'quadrant2'],
    },
  },
  quadrants: {
    quadrant1: {
      name: 'test quadrant 1',
      id: 'quadrant1',
      todos: ['todo1', 'todo2'],
    },
    quadrant2: {
      name: 'test quadrant 2',
      id: 'quadrant2',
      todos: ['todo3'],
    },
  },
  todos: {
    todo1: {
      checked: false,
      editing: false,
      id: 'todo1',
      value: 'test todo 1',
    },
    todo2: {
      checked: true,
      editing: false,
      id: 'todo2',
      value: 'test todo 2',
    },
    todo3: {
      checked: true,
      editing: false,
      id: 'todo3',
      value: 'test todo 3',
    },
  },
};
