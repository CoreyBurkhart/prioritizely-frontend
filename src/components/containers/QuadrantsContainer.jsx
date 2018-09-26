import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

/**
 * not using this for now
 */
class QuadrantsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <DragDropContext>
        {this.props.children}
      </DragDropContext>
    );
  }
}

export default QuadrantsContainer;
