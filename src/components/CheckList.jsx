import React from 'react';
import {
  List,
  ListItem,
  Checkbox,
  Input,
  Icon,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Todo from '../utils/classes/Todo';

/**
 * @param {DraggableStateSnapshot}
 *  @prop {Boolean} isDragging
 *  @prop {Boolean} isDropAnimating
 *  @prop {String} draggingOver - the id of the droppable that is dragged
 *    over
 * @returns {String}
 */
function getListItemClassNames({ isDragging, isDropAnimating }) {
  const dragging = isDragging ? 'dragging' : '';
  const dropping = isDropAnimating ? 'dropping' : '';

  return `${dragging} ${dropping}`;
}

/**
 * @param {DroppableStateSnapshot}
 *  @prop {Boolean} isDraggingOver
 *  @prop {String} draggingOverWith - draggable id
 * @returns {String}
 */
function getListClassNames({ isDraggingOver }) {
  const dragOver = isDraggingOver ? 'drag-over' : '';

  return `${dragOver}`;
}

function CheckList({
  onAdd,
  items,
  onCheck,
  onEditStart,
  onEditEnd,
  onEdit,
  onDelete,
}) {
  return (
    <Droppable droppableId="test">
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          <List component="ol" className={getListClassNames(snapshot)}>
            {items.map((item, i) => (
              <Draggable draggableId={item.id} key={item.id} index={i}>
                {(dragProvided, dragSnapshot) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    tabIndex="-1"
                  >
                    <ListItem className={getListItemClassNames(dragSnapshot)}>
                      <ListItemIcon>
                        <Icon>drag_indicator</Icon>
                      </ListItemIcon>
                      <Checkbox
                        checked={item.checked}
                        onChange={onCheck(item, i)}
                      />
                      <Input
                        disableUnderline={!item.editing}
                        type="text"
                        autoFocus
                        style={{
                          textDecoration: item.checked
                            ? 'line-through'
                            : 'initial',
                        }}
                        value={item.value}
                        onFocus={onEditStart(item, i)}
                        onChange={onEdit(item, i)}
                        onBlur={onEditEnd(item, i)}
                        onKeyUp={onEditEnd(item, i)}
                      />
                      <ListItemSecondaryAction>
                        <IconButton onClick={onDelete(item, i)}>
                          <Icon>close</Icon>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                )}
              </Draggable>
            ))}
            <ListItem onClick={onAdd}>
              <ListItemIcon>
                <IconButton>
                  <Icon>add_circler</Icon>
                </IconButton>
              </ListItemIcon>
              <ListItemText>Add item</ListItemText>
            </ListItem>
          </List>
        </div>
      )}
    </Droppable>
  );
}

CheckList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.instanceOf(Todo)).isRequired,
  onAdd: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onEditStart: PropTypes.func.isRequired,
  onEditEnd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CheckList;
