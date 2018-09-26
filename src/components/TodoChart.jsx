import React, { Component } from 'react';
import Quadrant from './Quadrant';

function TodoChart({ chart }) {
  const { name, quadrants } = chart;

  return (
    <div className="todo-chart">
      <h2>{name}</h2>
      {quadrants.map(q => (<Quadrant key={q.id} quadrant={q} />))}
    </div>
  );
}

export default TodoChart;
