import {
  EDIT_TODO, ADD_TODO, DELETE_TODO, DND_REORDER,
} from './types';

export const editTodo = (todoId, key, value) => ({
  type: EDIT_TODO,
  todoId,
  key,
  value,
});

export const addTodo = quadrantId => ({
  type: ADD_TODO,
  quadrantId,
});

export const deleteTodo = (quadrantId, todoId) => ({
  type: DELETE_TODO,
  quadrantId,
  todoId,
});

export const dndReorder = result => ({
  type: DND_REORDER,
  result,
});

export default {};
