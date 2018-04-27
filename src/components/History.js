import React from 'react';
import Card from './Card';

function History (props) {
  const { data, todayTodo, onComplete, onDelete } = props;

  return (
    <div className="History">
      <h2>History</h2>
      <div>
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
    </div>
  )
}

export default History;