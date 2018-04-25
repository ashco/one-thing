import React from 'react';

class PastToDo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isHovered: false
    }
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover () {
    this.setState({
      isHovered: !this.state.isHovered
    })
  }

  render () {
    const { date, text, status } = this.props;
    const hoverClass = this.state.isHovered ? 'hovered' : '';

    return (
      <div
        // className='PastToDo'
        className={`PastToDo ${hoverClass}`}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        style={{borderColor: status ? 'green' : 'red'}}>
        <div className="todo-text">
          {text}
        </div>
        <div className="todo-date">
          {date}
        </div>

      </div>
    )
  }
}

export default PastToDo;