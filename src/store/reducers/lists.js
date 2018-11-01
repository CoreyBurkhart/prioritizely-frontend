import { cloneDeep as _cloneDeep } from 'lodash';
import initialState from '../states/lists';
import {
  ADD_TODO,
  DELETE_TODO,
  DND_REORDER,
  ADD_CHART,
  DELETE_CHART,
  ADD_QUADRANT,
  DELETE_QUADRANT,
  EDIT_BY_ID,
  SET_LAST_CHART,
} from '../actions/lists/types';
import TodoClass from '@/utils/classes/Todo';
import QuadrantClass from '@/utils/classes/Quadrant';

function updateById(state, {
  section, id, key, value,
}) {
  const shouldBail = !(section in state)
    || !(id in state[section])
    || !(key in state[section][id]);

  // console.log(!(section in state),
  // !(id in state[section]),
  // !(key in state[section][id]))

  if (shouldBail) {
    return state;
  }

  return Object.assign({}, state, {
    [section]: Object.assign({}, state[section], {
      [id]: Object.assign({}, state[section][id], {
        [key]: value,
      }),
    }),
  });
}

function addTodo(state, { quadrantId }) {
  const todo = new TodoClass();
  const updatedTodos = Object.assign({}, state.todos, {
    [todo.id]: todo,
  });
  const updatedQuadrantTodoIds = [
    ...state.quadrants[quadrantId].todos,
    todo.id,
  ];

  return Object.assign({}, state, {
    quadrants: Object.assign({}, state.quadrants, {
      [quadrantId]: Object.assign({}, state.quadrants[quadrantId], {
        todos: updatedQuadrantTodoIds,
      }),
    }),
    todos: updatedTodos,
  });
}

function deleteTodo(state, { quadrantId, todoId }) {
  const updatedQuadrantTodoIds = state.quadrants[quadrantId].todos.filter(
    t => t !== todoId,
  );
  const updatedTodos = Object.assign({}, state.todos);
  delete updatedTodos[todoId];

  return Object.assign({}, state, {
    quadrants: Object.assign({}, state.quadrants, {
      [quadrantId]: Object.assign({}, state.quadrants[quadrantId], {
        todos: updatedQuadrantTodoIds,
      }),
    }),
    todos: updatedTodos,
  });
}

function dndReorder(state, { result }) {
  const { source, destination } = result;
  if (!destination) {
    return state;
  }

  let scope;
  if (result.type === 'TODO') {
    scope = {
      main: 'quadrants',
      items: 'todos',
    };
  } else if (result.type === 'QUADRANT') {
    scope = {
      main: 'charts',
      items: 'quadrants',
    };
  }

  const sourceQuadrantTodoIds = [
    ...state[scope.main][source.droppableId][scope.items],
  ];
  let destinationQuadrantTodoIds = [
    ...state[scope.main][destination.droppableId][scope.items],
  ];

  const [removedId] = sourceQuadrantTodoIds.splice(source.index, 1);

  if (source.droppableId === destination.droppableId) {
    destinationQuadrantTodoIds = sourceQuadrantTodoIds;
  }
  destinationQuadrantTodoIds.splice(destination.index, 0, removedId);

  const updatedSourceQuadrant = Object.assign(
    {},
    state[scope.main][source.droppableId],
    {
      [scope.items]: sourceQuadrantTodoIds,
    },
  );

  const updatedDestinationQuadrant = Object.assign(
    {},
    state[scope.main][destination.droppableId],
    {
      [scope.items]: destinationQuadrantTodoIds,
    },
  );

  let updatedQuadrants;

  if (source.droppableId === destination.droppableId) {
    updatedQuadrants = Object.assign({}, state[scope.main], {
      [destination.droppableId]: updatedDestinationQuadrant,
    });
  } else {
    updatedQuadrants = Object.assign({}, state[scope.main], {
      [source.droppableId]: updatedSourceQuadrant,
      [destination.droppableId]: updatedDestinationQuadrant,
    });
  }

  return Object.assign({}, state, {
    [scope.main]: updatedQuadrants,
  });
}

function addChart(state, { chart }) {
  const updatedCharts = Object.assign({}, state.charts, {
    [chart.id]: chart,
  });

  return Object.assign({}, state, {
    lastChartId: chart.id,
    charts: updatedCharts,
  });
}

function deleteChart(state, { chartId }) {
  if (!(chartId in state.charts)) {
    return state;
  }

  const stateClone = _cloneDeep(state);
  const { quadrants } = stateClone.charts[chartId];
  const todosIds = quadrants.reduce(
    (accumulator, quadrantId) => [
      ...accumulator,
      ...stateClone.quadrants[quadrantId].todos,
    ],
    [],
  );
  // delete todos and quadrants belonging to the chart
  quadrants.forEach(id => delete stateClone.quadrants[id]);
  todosIds.forEach(id => delete stateClone.todos[id]);

  // delete the chart object
  delete stateClone.charts[chartId];
  stateClone.lastChartId = '';
  return stateClone;
}

function addQuadrant(state, { chartId }) {
  if (!(chartId in state.charts)) {
    return state;
  }

  const quadrant = new QuadrantClass();
  const updatedChart = Object.assign({}, state.charts[chartId], {
    quadrants: [...state.charts[chartId].quadrants, quadrant.id],
  });
  const updatedQuadrants = Object.assign({}, state.quadrants, {
    [quadrant.id]: quadrant,
  });

  return Object.assign({}, state, {
    charts: Object.assign({}, state.charts, {
      [chartId]: updatedChart,
    }),
    quadrants: updatedQuadrants,
  });
}

function deleteQuadrant(state, { chartId, quadrantId }) {
  if (!(chartId in state.charts) || !(quadrantId in state.quadrants)) {
    return state;
  }

  const stateClone = _cloneDeep(state);
  const todosIds = [...state.quadrants[quadrantId].todos];
  stateClone.charts[chartId].quadrants = state.charts[chartId].quadrants.filter(
    id => id !== quadrantId,
  );

  // delete todos and quadrants belonging to the quadrant
  todosIds.forEach(id => delete stateClone.todos[id]);

  // delete the chart object
  delete stateClone.quadrants[quadrantId];
  return stateClone;
}

function setLastChart(state, { chartId }) {
  if (!(chartId in state.charts)) {
    return state;
  }

  return Object.assign({}, state, {
    lastChartId: chartId,
  });
}

function lists(state = initialState, action) {
  switch (action.type) {
    case EDIT_BY_ID:
      return updateById(state, action);
    case ADD_TODO:
      return addTodo(state, action);
    case DELETE_TODO:
      return deleteTodo(state, action);
    case DND_REORDER:
      return dndReorder(state, action);
    case ADD_CHART:
      return addChart(state, action);
    case DELETE_CHART:
      return deleteChart(state, action);
    case ADD_QUADRANT:
      return addQuadrant(state, action);
    case DELETE_QUADRANT:
      return deleteQuadrant(state, action);
    case SET_LAST_CHART:
      return setLastChart(state, action);
    default:
      return state;
  }
}

export default lists;
