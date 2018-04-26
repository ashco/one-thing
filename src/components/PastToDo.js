import React from 'react';

class CardMain extends React.Component {

  render () {
    const { date, text } = this.props;

    return (
      <div className='CardMain'>
        <h3>{text}</h3>
        <p>{date}</p>
      </div>
    )
  }
}


class CardHover extends React.Component {
  render () {
    const { status } = this.props;

    const format = status === true
      ? {
        style: 'green',
        text: 'Complete',
        button: '✅'
      } : {
        style: 'red',
        text: 'Slacker',
        button: 'X'
      }

    return (
      <div className='CardHover' style={{backgroundColor: `${format.style}`}}>
        <h2>{format.text}</h2>
        <button>{format.button}</button>
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
    const { date, text, status } = this.props;

    return (
      <div
        className='Card'
        style={{borderColor: status ? 'green' : 'red'}}>
        <CardMain date={date} text={text} />
        <CardHover status={status} />
      </div>
    )
  }
}

export default Card;