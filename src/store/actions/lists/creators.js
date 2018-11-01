import {
  EDIT_BY_ID, ADD_TODO, DELETE_TODO, DND_REORDER, ADD_CHART, DELETE_CHART, ADD_QUADRANT, DELETE_QUADRANT, SET_LAST_CHART,
} from './types';

export const editById = (section, id, key, value) => ({
  type: EDIT_BY_ID,
  section,
  id,
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

export const addChart = chart => ({
  type: ADD_CHART,
  chart,
});

export const deleteChart = chartId => ({
  type: DELETE_CHART,
  chartId,
});

export const addQuadrant = chartId => ({
  type: ADD_QUADRANT,
  chartId,
});

export const deleteQuadrant = (chartId, quadrantId) => ({
  type: DELETE_QUADRANT,
  chartId,
  quadrantId,
});

export const setLastChart = chartId => ({
  type: SET_LAST_CHART,
  chartId,
});
