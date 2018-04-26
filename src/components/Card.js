import React from 'react';
import { formatCard } from '../helpers/helpers';

function CardMain (props) {
  const { unix, text } = props;
  const date = formatCard(unix);

  return (
    <div className='CardMain'>
      <h3>{text}</h3>
      <p>{date}</p>
    </div>
  )
}

class CardHover extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isBtnHovered: false
    }
  }

  handleBtnHover = () => {
    this.setState(() => ({
      isBtnHovered: !this.state.isBtnHovered
    }))
  }

  handleComplete = (event) => {
    event.preventDefault();
    const { index, onComplete } = this.props;

    onComplete(index);
  }

  handleDelete = (event) => {
    event.preventDefault();
    const { index, onDelete } = this.props;

    onDelete(index);
  }

  render () {
    const { isBtnHovered } = this.state;
    const { status } = this.props;
    let format


    if (isBtnHovered && status) {
      format = {
        func: this.handleDelete,
        style: 'var(--black-color)',
        text: 'Delete?',
        button: '✖︎'
      }
    }
    else if (isBtnHovered && !status || status) {
      format = {
        func: this.handleComplete,
        style: 'var(--green-color)',
        text: 'Complete!',
        button: '☑︎'
      }
    }
    else if (!status) {
      format = {
        func: this.handleDelete,
        style: 'var(--black-color)',
        text: 'Complete',
        button: '?'
      }
    }

    return (
      <div className='CardHover' style={{backgroundColor: `${format.style}`}}>
        <h2>{format.text}</h2>
        <button
          onMouseEnter={this.handleBtnHover}
          onMouseLeave={this.handleBtnHover}
          onClick={format.func}>
            {format.button}
        </button>
      </div>
    )
  }
}

function Card (props) {
  const { index, todayTodo, unix, text, status, onComplete, onDelete } = props;

  return (
    <div
      className='Card'
      style={{
        borderColor: status ? 'green' : 'red',
        display: todayTodo === 'incomplete' && index === 0 ? 'none' : ''}}>
      <CardMain
        unix={unix}
        text={text} />
      <CardHover
        index={index}
        status={status}
        onComplete={onComplete}
        onDelete={onDelete} />
    </div>
  )
}

export default Card;