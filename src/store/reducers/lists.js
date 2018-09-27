import { cloneDeep as _cloneDeep } from 'lodash';
import initialState from '../states/lists';
import {
  EDIT_TODO,
  ADD_TODO,
  DELETE_TODO,
  DND_REORDER,
} from '../actions/lists/types';
import TodoClass from '@/utils/classes/Todo';

function updateTodo(state, { todoId, key, value }) {
  const stateClone = _cloneDeep(state);
  stateClone.todos[todoId][key] = value;

  return stateClone;
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

  const sourceQuadrantTodoIds = [...state[scope.main][source.droppableId][scope.items]];
  let destinationQuadrantTodoIds = [
    ...state[scope.main][destination.droppableId][scope.items],
  ];

  const [removedId] = sourceQuadrantTodoIds.splice(source.index, 1);

  if (source.droppableId === destination.droppableId) {
    destinationQuadrantTodoIds = sourceQuadrantTodoIds;
  }
  destinationQuadrantTodoIds.splice(destination.index, 0, removedId);

  const updatedSourceQuadrant = Object.assign({}, state[scope.main][source.droppableId], {
    [scope.items]: sourceQuadrantTodoIds,
  });

  const updatedDestinationQuadrant = Object.assign({}, state[scope.main][destination.droppableId], {
    [scope.items]: destinationQuadrantTodoIds,
  });

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

function lists(state = initialState, action) {
  switch (action.type) {
    case EDIT_TODO:
      return updateTodo(state, action);
    case ADD_TODO:
      return addTodo(state, action);
    case DELETE_TODO:
      return deleteTodo(state, action);
    case DND_REORDER:
      return dndReorder(state, action);
    default:
      return state;
  }
}

export default lists;
