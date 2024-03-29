import { connect } from 'react-redux';
import CheckList from './CheckList';
import { editById, addTodo, deleteTodo } from '../../store/actions/lists/creators';

/**
 * @param {Object} state
 * @param {String} quadrantId
 * @return {Array<Object>} todos that belong to the quadrant provided.
 */
const getTodos = (state, quadrantId) => {
  const { todos: allTodos } = state;
  const { todos: quadrantTodoIds } = state.quadrants[quadrantId];

  return quadrantTodoIds.map(id => allTodos[id]);
};

const mapStateToProps = (state, ownProps) => ({
  items: getTodos(state.lists, ownProps.quadrantId),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAdd: () => {
    dispatch(addTodo(ownProps.quadrantId));
  },
  onCheck: item => (event, checked) => {
    dispatch(editById('todos', item.id, 'checked', checked));
  },
  onEditStart: item => () => {
    dispatch(editById('todos', item.id, 'editing', true));
  },
  onEditEnd: item => () => {
    dispatch(editById('todos', item.id, 'editing', false));
  },
  onEdit: item => (event) => {
    const { value } = event.target;

    dispatch(editById('todos', item.id, 'value', value));
  },
  onDelete: item => () => {
    dispatch(deleteTodo(ownProps.quadrantId, item.id));
  },
});

const CheckListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckList);

export default CheckListContainer;
