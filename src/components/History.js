import React from 'react';
import Card from './Card';

class History extends React.Component {

  render () {
    const { data, currentUnix, onComplete, onDelete } = this.props;

    return (
      <div className="History column">
        <h1>History</h1>
        {data.map((todo, index) => {
          return (
            <Card
              key={index}
              index={index}
              currentUnix={currentUnix}
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
}

export default History;