import React from 'react';
import { formatCard, sameDateCheck } from '../helpers/helpers';

class CardMain extends React.Component {

  render () {
    const { unix, text } = this.props;
    const date = formatCard(unix);

    return (
      <div className='CardMain'>
        <h3>{text}</h3>
        <p>{date}</p>
      </div>
    )
  }
}


class CardHover extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isHovered: false
    }
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover () {
    this.setState(() => ({
      isHovered: !this.state.isHovered
    }))
  }

  handleComplete = (event) => {
    event.preventDefault();


  }

  handleDelete = (event) => {
    event.preventDefault();
    const { index, onDelete } = this.props;

    onDelete(index);
  }

  render () {
    const { isHovered } = this.state;
    const { status } = this.props;

    let btnFormat

    if (isHovered) {
      btnFormat = {
        func: this.handleDelete,
        style: 'var(--black-color)',
        text: 'Delete?',
        button: 'X'
      }
    }
    else if (status) {
      btnFormat = {
        func: this.handleComplete,
        style: 'var(--green-color)',
        text: 'Complete!',
        button: '☑︎'
      }
    }
    else {
      btnFormat = {
        func: this.handleDelete,
        style: 'var(--red-color)',
        text: 'Failure!',
        button: '✖︎'
      }
    }

    return (
      <div className='CardHover' style={{backgroundColor: `${btnFormat.style}`}}>
        <h2>{btnFormat.text}</h2>
        <button
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
          onClick={btnFormat.func}>
            {btnFormat.button}
          </button>
      </div>
    )
  }
}

class Card extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }


  render () {
    const { index, currentUnix, unix, text, status, onComplete, onDelete } = this.props;

    return (
      <div
        className='Card'
        style={{
          borderColor: status ? 'green' : 'red',
          display: sameDateCheck(currentUnix, unix) && status === false ? 'none' : ''}}>
        <CardMain unix={unix} text={text} />
        <CardHover index={index} status={status} onComplete={onComplete} onDelete={onDelete} />
      </div>
    )
  }
}

export default Card;