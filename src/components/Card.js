import React from 'react';
import PropTypes from 'prop-types';
import { formatCard } from '../helpers/helpers';

function CardMain(props) {
  const { unix, text } = props;
  const date = formatCard(unix);

  return (
    <div className="CardMain">
      <h3 className="CardMain--textbox">{text}</h3>
      <p className="CardMain--date">-{date}</p>
    </div>
  );
}

CardMain.propTypes = {
  unix: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

function CardHoverComplete(props) {
  const { deleteBtnHover, handleDeleteBtnHover, handleDelete } = props;

  return (
    <div className={`CardHover ${!deleteBtnHover ? 'CardHover--complete' : 'CardHover--delete'}`}>
      <h2>{!deleteBtnHover ? 'Complete!' : 'Delete?'}</h2>
      <div className="CardHover--btn-container">
        <button
          className={`btn-small ${!deleteBtnHover ? 'btn-chk' : 'btn-del'}`}
          onMouseEnter={handleDeleteBtnHover}
          onMouseLeave={handleDeleteBtnHover}
          onClick={handleDelete}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

CardHoverComplete.propTypes = {
  deleteBtnHover: PropTypes.bool.isRequired,
  handleDeleteBtnHover: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

function CardHoverIncomplete(props) {
  const {
    completeBtnHover,
    deleteBtnHover,
    handleCompleteBtnHover,
    handleDeleteBtnHover,
    handleComplete,
    handleDelete,
  } = props;

  const btn = {
    title: 'Busy?',
    cardStyle: '',
  };

  if (completeBtnHover) {
    btn.title = 'Complete!';
    btn.cardStyle = 'CardHover--complete';
  } else if (deleteBtnHover) {
    btn.title = 'Delete?';
    btn.cardStyle = 'CardHover--delete';
  }

  return (
    <div className={`CardHover ${btn.cardStyle}`}>
      <h2>{btn.title}</h2>
      <div className="CardHover--btn-container">
        <button
          className="btn-small btn-chk"
          onMouseEnter={handleCompleteBtnHover}
          onMouseLeave={handleCompleteBtnHover}
          onClick={handleComplete}
        >
          ✓
        </button>
        <button
          className="btn-small btn-del"
          onMouseEnter={handleDeleteBtnHover}
          onMouseLeave={handleDeleteBtnHover}
          onClick={handleDelete}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

CardHoverIncomplete.propTypes = {
  completeBtnHover: PropTypes.bool.isRequired,
  deleteBtnHover: PropTypes.bool.isRequired,
  handleCompleteBtnHover: PropTypes.func.isRequired,
  handleDeleteBtnHover: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

class CardHover extends React.Component {
  handleComplete = event => {
    event.preventDefault();
    const { index, handleStreak, onComplete } = this.props;

    onComplete(index);
    handleStreak();
  };

  handleDelete = event => {
    event.preventDefault();
    const { index, handleStreak, onDelete } = this.props;

    onDelete(index);
    handleStreak();
  };

  render() {
    const {
      status,
      completeBtnHover,
      deleteBtnHover,
      handleCompleteBtnHover,
      handleDeleteBtnHover,
    } = this.props;

    if (status) {
      return (
        <CardHoverComplete
          deleteBtnHover={deleteBtnHover}
          handleDeleteBtnHover={handleDeleteBtnHover}
          handleDelete={this.handleDelete}
        />
      );
    } else if (!status) {
      return (
        <CardHoverIncomplete
          completeBtnHover={completeBtnHover}
          deleteBtnHover={deleteBtnHover}
          handleCompleteBtnHover={handleCompleteBtnHover}
          handleDeleteBtnHover={handleDeleteBtnHover}
          handleComplete={this.handleComplete}
          handleDelete={this.handleDelete}
        />
      );
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
  onDelete: PropTypes.func.isRequired,
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false,
      completeBtnHover: false,
      deleteBtnHover: false,
    };
  }

  toggleRevealed = () => {
    this.setState({
      revealed: !this.state.revealed,
    });
  };

  handleCompleteBtnHover = () =>
    this.setState(() => ({ completeBtnHover: !this.state.completeBtnHover }));

  handleDeleteBtnHover = () =>
    this.setState(() => ({ deleteBtnHover: !this.state.deleteBtnHover }));

  render() {
    const { revealed, completeBtnHover, deleteBtnHover } = this.state;
    const { index, todayTodo, unix, text, status, handleStreak, onComplete, onDelete } = this.props;
    let borderColor = 'var(--black-trans-color)';

    if (deleteBtnHover) {
      borderColor = 'var(--red-trans-color)';
    }
    // else if (completeBtnHover || status) {
    else if (completeBtnHover) {
      borderColor = 'var(--green-trans-color)';
    }

    if (index === 0 && todayTodo === 'incomplete') {
      return '';
    } else {
      return (
        <div
          className={`Card ${revealed ? 'revealed' : undefined}`}
          style={{ borderColor: borderColor }}
          onClick={this.toggleRevealed}
        >
          <CardMain unix={unix} text={text} />
          <CardHover
            index={index}
            status={status}
            handleStreak={handleStreak}
            completeBtnHover={completeBtnHover}
            deleteBtnHover={deleteBtnHover}
            handleCompleteBtnHover={this.handleCompleteBtnHover}
            handleDeleteBtnHover={this.handleDeleteBtnHover}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        </div>
      );
    }
  }
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  todayTodo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  unix: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
