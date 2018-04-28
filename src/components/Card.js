import React from 'react';
import Button from './Button';
import { formatCard } from '../helpers/helpers';

class CardMain extends React.Component {

  // componentDidMount () {
  //   autoFontSize(index);
  // }

  render () {
    const { unix, text } = this.props;
    const date = formatCard(unix);

    return (
      <div className='CardMain'>
        {/* <div className='CardMain--textbox'> */}
          <h3 className='CardMain--textbox'>{text}</h3>
        {/* </div> */}
        <p className='CardMain--date'>-{date}</p>
      </div>
    )
  }
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

function Card (props) {
  const { index, todayTodo, unix, text, status, onComplete, onDelete } = props;

  return (
    <div
      className='Card'
      style={{
        borderColor: status ? 'var(--green-color)' : 'var(--black-color)',
        // display: todayTodo === 'incomplete' && index === 0 ? 'none' : ''
        }}>
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

export default Card;