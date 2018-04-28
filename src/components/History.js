import React from 'react';
import Card from './Card';
import { autoFontSize } from '../helpers/helpers';

class History extends React.Component {

  componentDidMount () {
    autoFontSize();
    window.addEventListener('resize', autoFontSize);
  }

  componentDidUnmount () {
    window.removeEventListener('resize', autoFontSize);
  }

  componentDidUpdate () {
    autoFontSize();
  }

  render () {
    const { data, todayTodo, onComplete, onDelete } = this.props;

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
              onDelete={onDelete} />
          )
        })}
        </div>
      </div>
    )
  }
}

export default History;