import React from 'react';
import Card from './Card';

function History (props) {
  const { data, currentUnix, todayTodo, onComplete, onDelete } = props;

  return (
    <div className="History column">
      <h1>History</h1>
      {data.map((todo, index) => {
        return (
          <Card
            key={index}
            index={index}
            todayTodo={todayTodo}
            unix={todo.unix}
            text={todo.text}
            status={todo.status}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        )
      })}
    </div>
  )
}

export default History;