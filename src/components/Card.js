import React from 'react';
import Button from './Button';
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

    let format = {};

    if (isBtnHovered && status) {
      format = {
        func: this.handleDelete,
        style: {
          backgroundColor: 'var(--black-color)'
        },
        btnStyle: {
          backgroundColor: 'var(--black-alt-color)'
        },
        text: 'Delete?',
        button: '✕'
      }
    }
    else if (status || isBtnHovered && !status) {
      format = {
        func: this.handleComplete,
        style: {
          backgroundColor: 'var(--green-color)'
        },
        btnStyle: {
          backgroundColor: 'var(--green-alt-color)'
        },
        text: 'Complete!',
        button: '✓'
      }
    }
    else if (!status) {
      format = {
        func: this.handleDelete,
        style: {
          backgroundColor: 'var(--black-color)'
        },
        btnStyle: {
          backgroundColor: 'var(--black-alt-color)'
        },
        text: 'Busy, huh...',
        button: '...'
      }
    }

    return (
      <div className='CardHover' style={format.style}>
        <h2>{format.text}</h2>
          <button
            onMouseEnter={this.handleBtnHover}
            onMouseLeave={this.handleBtnHover}
            className='btn-small'
            style={format.btnStyle}
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
        borderColor: status ? 'var(--green-color)' : 'var(--black-color)',
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