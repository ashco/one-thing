import React from 'react';
import PropTypes from 'prop-types';
import { formatCard } from '../helpers/helpers';
require('dotenv').config();

class CardMain extends React.Component {
  render () {
    const { unix, text } = this.props;
    const date = formatCard(unix);

    return (
      <div className='CardMain'>
        <h3 className='CardMain--textbox'>{text}</h3>
        <p className='CardMain--date'>-{date}</p>
      </div>
    )
  }
}

CardMain.propTypes = {
  index: PropTypes.number.isRequired,
  unix: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
}

class CardHover extends React.Component {
  constructor (props) {
    super(props);
    this.state =  ({
      isBtnHovered: false
    })
  }

  handleBtnHover = () => {
    this.setState(() => ({ isBtnHovered: !this.state.isBtnHovered }))
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
          backgroundColor: 'var(--red-color)'
        },
        btnStyle: {
          backgroundColor: 'var(--red-alt-color)'
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

CardHover.propTypes = {
  index: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

function Card (props) {
  const { index, todayTodo, unix, text, status, onComplete, onDelete } = props;

  if (index === 0 && todayTodo === 'incomplete') {
    return '';
  }
  else {
    return (
      <div
        className='Card'
        style={{borderColor: status ? 'var(--green-color)' : 'var(--black-color)'}}>
        <CardMain
          index={index}
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
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  todayTodo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  unix: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Card;