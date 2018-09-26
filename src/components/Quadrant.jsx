import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CheckList from './CheckList';
import Todo from '../utils/classes/Todo';

/**
 * @desc Move the items @ sourceIndex to destinationIndex
 * and return a new items array.
 * @param {Array<String>} items
 * @param {Number} sourceIndex
 * @param {Number} destinationIndex
 * @returns reordered this.state.items
 */
function reorder(items, sourceIndex, destinationIndex) {
  const itemsCopy = [...items];

  // remove source
  const [removed] = itemsCopy.splice(sourceIndex, 1);
  // place source @ destination
  itemsCopy.splice(destinationIndex, 0, removed);

  return itemsCopy;
}

class Quadrant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.quadrant.items,
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.onEditStart = this.onEditStart.bind(this);
    this.onEditEnd = this.onEditEnd.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  onDragEnd({ destination, source }) {
    if (!destination) {
      return;
    }

    const { index: sourceIndex } = source;
    const { index: destinationIndex } = destination;

    const reorderedItems = reorder(
      this.state.items,
      sourceIndex,
      destinationIndex,
    );

    this.setState({
      items: reorderedItems,
    });
  }

  onEdit(item, itemIndex) {
    return (event) => {
      event.preventDefault();
      const { items } = this.state;
      const itemsClone = [...items];
      const newItem = item.updateKey('value', event.target.value);

      itemsClone.splice(itemIndex, 1, newItem);
      this.setState({
        items: itemsClone,
      });
    };
  }

  onEditStart(item, itemIndex) {
    return (event) => {
      event.preventDefault();
      const { items } = this.state;
      const itemsClone = [...items];
      const newItem = item.updateKey('editing', true);

      itemsClone.splice(itemIndex, 1, newItem);
      this.setState({
        items: itemsClone,
      });
    };
  }

  onEditEnd(item, itemIndex) {
    return async (event) => {
      const { items } = this.state;
      const itemsClone = [...items];
      const endEditingOnKeys = ['Enter', 'Escape'];
      const isEmpty = item.value === '';
      let editing = true;

      switch (event.type) {
        case 'keyup':
          if (endEditingOnKeys.includes(event.key)) {
            editing = false;
          }
          break;
        default:
          editing = false;
          break;
      }

      const newItem = item.updateKey('editing', editing);

      if (isEmpty) {
        itemsClone.splice(itemIndex, 1);
      } else {
        itemsClone.splice(itemIndex, 1, newItem);
      }

      this.setState({
        items: itemsClone,
      });
    };
  }

  addTodo() {
    const { items } = this.state;
    const newItems = [...items];

    newItems.push(new Todo());
    this.setState({
      items: newItems,
    });
  }

  deleteTodo(item, itemIndex) {
    return (event) => {
      event.preventDefault();
      const { items } = this.state;
      const itemsClone = [...items];

      itemsClone.splice(itemIndex, 1);
      this.setState({
        items: itemsClone,
      });
    };
  }

  /**
   * Toggle the checked value of a given item in items.
   * @param {Object} item
   * @param {Number} itemIndex
   * @return {Function}
   */
  toggleCheck(item, itemIndex) {
    return (event, checked) => {
      const { items } = this.state;
      const itemsClone = [...items];
      const newItem = item.updateKey(
        'checked',
        checked !== undefined ? checked : !item.checked,
      );

      itemsClone.splice(itemIndex, 1, newItem);
      this.setState({
        items: itemsClone,
      });
    };
  }

  render() {
    return (
      <div className="quadrant">
        <h6 className="quadrant-title">title</h6>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <CheckList
            items={this.state.items}
            onCheck={this.toggleCheck}
            onEditStart={this.onEditStart}
            onEditEnd={this.onEditEnd}
            onEdit={this.onEdit}
            onDelete={this.deleteTodo}
            onAdd={this.addTodo}
          />
        </DragDropContext>
      </div>
    );
  }
}

export default Quadrant;
