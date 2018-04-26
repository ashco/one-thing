import React from 'react';
import Card from './PastToDo';

class History extends React.Component {


  render () {
    const { data } = this.props;

    return (
      <div className="History column">
        <h1>History</h1>
        {data.map((todo, index) => {
          return (
            <Card
              key={index}
              date={todo.date}
              text={todo.text}
              status={todo.status}
            />
          )
        })}
      </div>
    )
  }
}

export default History;