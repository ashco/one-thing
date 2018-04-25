import React from 'react';

class PastToDo extends React.Component {
  render () {
    return (
      <div className="PastToDo">
        <div className="todo-date">
          {this.props.date}
        </div>
        <div className="todo-text">
          {this.props.text}
        </div>
        <div className="todo-status">
          {this.props.status}
        </div>

      </div>
    )
  }
}

export default PastToDo;