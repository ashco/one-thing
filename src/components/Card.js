import React from 'react';
import PropTypes from 'prop-types';
import { formatCard } from '../helpers/helpers';

function CardMain (props) {
  const { unix, text } = props;
  const date = formatCard(unix);

  return (
    <div className='CardMain'>
      <h3 className='CardMain--textbox'>{text}</h3>
      <p className='CardMain--date'>-{date}</p>
    </div>
  )
}

CardMain.propTypes = {
  unix: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
}

function CardHoverComplete (props) {
  const { deleteBtnHover, handleDeleteBtnHover, handleDelete } = props;

  return (
    <div className='CardHover' style={{backgroundColor: !deleteBtnHover ? 'var(--green-color)' : 'var(--red-color)'}}>
      <h2>{!deleteBtnHover ? 'Complete!' : 'Delete?'}</h2>
      <div className="CardHover--btn-container">
        <button
          onMouseEnter={handleDeleteBtnHover}
          onMouseLeave={handleDeleteBtnHover}
          className='btn-small'
          style={{backgroundColor: !deleteBtnHover ? 'var(--green-alt-color)' : 'var(--red-alt-color)'}}
          onClick={handleDelete}
          >
            ✕
        </button>
      </div>
    </div>
  )
}


CardHoverComplete.propTypes = {
  deleteBtnHover: PropTypes.bool.isRequired,
  handleDeleteBtnHover: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}


function CardHoverIncomplete (props) {
  const { completeBtnHover, deleteBtnHover, handleCompleteBtnHover, handleDeleteBtnHover, handleComplete, handleDelete } = props;

  let title = 'Busy?';
  let backgroundColor = 'var(--black-color)';
  let completeBtnColor = 'var(--black-alt-color)';
  let deleteBtnColor = 'var(--black-alt-color)';

  if (completeBtnHover) {
    title = 'Complete!';
    backgroundColor = 'var(--green-color)'
    completeBtnColor = 'var(--green-alt-color)';
    deleteBtnColor = 'var(--green-color)';
  }
  else if (deleteBtnHover) {
    title = 'Delete?';
    backgroundColor = 'var(--red-color)'
    completeBtnColor = 'var(--red-color)';
    deleteBtnColor = 'var(--red-alt-color)';
  }

  return (
    <div className='CardHover' style={{backgroundColor: backgroundColor}}>
      <h2>{title}</h2>
      <div className="CardHover--btn-container">
        <button
          onMouseEnter={handleCompleteBtnHover}
          onMouseLeave={handleCompleteBtnHover}
          className='btn-small'
          style={{backgroundColor: completeBtnColor}}
          onClick={handleComplete}
          >
            ✓
        </button>
        <button
          onMouseEnter={handleDeleteBtnHover}
          onMouseLeave={handleDeleteBtnHover}
          className='btn-small'
          style={{backgroundColor: deleteBtnColor}}
          onClick={handleDelete}
          >
            ✕
        </button>
      </div>
    </div>
  )
}


CardHoverIncomplete.propTypes = {
  completeBtnHover: PropTypes.bool.isRequired,
  deleteBtnHover: PropTypes.bool.isRequired,
  handleCompleteBtnHover: PropTypes.func.isRequired,
  handleDeleteBtnHover: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}


class CardHover extends React.Component {

  handleComplete = (event) => {
    event.preventDefault();
    const { index, handleStreak, onComplete } = this.props;

    onComplete(index);
    handleStreak();
  }

  handleDelete = (event) => {
    event.preventDefault();
    const { index, handleStreak, onDelete } = this.props;

    onDelete(index);
    handleStreak();
  }

  render () {
    const { status, completeBtnHover, deleteBtnHover, handleCompleteBtnHover, handleDeleteBtnHover } = this.props;

    if (status) {
      return <CardHoverComplete
        deleteBtnHover={deleteBtnHover}
        handleDeleteBtnHover={handleDeleteBtnHover}
        handleDelete={this.handleDelete} />
    }
    else if (!status) {
      return <CardHoverIncomplete
        completeBtnHover={completeBtnHover}
        deleteBtnHover={deleteBtnHover}
        handleCompleteBtnHover={handleCompleteBtnHover}
        handleDeleteBtnHover={handleDeleteBtnHover}
        handleComplete={this.handleComplete}
        handleDelete={this.handleDelete}
        />
    }
  }
}

CardHover.propTypes = {
  index: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
  completeBtnHover: PropTypes.bool.isRequired,
  deleteBtnHover: PropTypes.bool.isRequired,
  handleCompleteBtnHover: PropTypes.func.isRequired,
  handleDeleteBtnHover: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

class Card extends React.Component {
  constructor (props) {
    super(props);
    this.state =  ({
      completeBtnHover: false,
      deleteBtnHover: false,
    })
  }

  handleCompleteBtnHover = () => this.setState(() => ({ completeBtnHover: !this.state.completeBtnHover }));

  handleDeleteBtnHover = () => this.setState(() => ({ deleteBtnHover: !this.state.deleteBtnHover }));

  render () {
    const { completeBtnHover, deleteBtnHover } = this.state;
    const { index, todayTodo, unix, text, status, handleStreak, onComplete, onDelete } = this.props;
    let borderColor = 'var(--black-trans-color)';

    if (deleteBtnHover) {
      borderColor = 'var(--red-trans-color)';
    }
    else if (completeBtnHover || status) {
      borderColor = 'var(--green-trans-color)';
    }

    if (index === 0 && todayTodo === 'incomplete') {
      return '';
    }
    else {
      return (
        <div
          className='Card'
          style={{borderColor: borderColor}}>
          <CardMain
            unix={unix}
            text={text} />
          <CardHover
            index={index}
            status={status}
            handleStreak={handleStreak}
            completeBtnHover={completeBtnHover}
            deleteBtnHover={deleteBtnHover}
            handleCompleteBtnHover={this.handleCompleteBtnHover}
            handleDeleteBtnHover={this.handleDeleteBtnHover}
            onComplete={onComplete}
            onDelete={onDelete} />
        </div>
      )
    }
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