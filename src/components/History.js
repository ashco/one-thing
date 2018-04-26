import React from 'react';
import Card from './Card';
import { sameDateCheck } from '../helpers/helpers';

class History extends React.Component {

  render () {
    const { data, currentUnix } = this.props;

    return (
      <div className="History column">
        <h1>History</h1>
        {data.map((todo, index) => {
          return (
            <Card
              key={index}
              currentUnix={currentUnix}
              unix={todo.unix}
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