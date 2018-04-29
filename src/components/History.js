import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import menu from '../menu_icon.svg';
import { autoFontSize } from '../helpers/helpers';

class History extends React.Component {
  componentDidMount () {
    autoFontSize();
    window.addEventListener('resize', autoFontSize);
  }

  componentWillUnmount = () => window.removeEventListener('resize', autoFontSize);

  toggleMenu = () => {
    this.props.toggleHistory();
    this.props.toggleMain();
  }

  render () {
    const { data, todayTodo, activeHistory, toggleHistory, onComplete, onDelete } = this.props;

    return (
      <div className="History" style={{ height: activeHistory ? '100vh' : '10vh' }}>
        <div className="History--header">
          <button className="menu-btn" onClick={this.toggleMenu}>
            <img src={menu} alt="Menu" />
          </button>
          {activeHistory ? <h2>History</h2> : <h2>One Thing</h2>}
        </div>
        {activeHistory &&
          <div className="History--main">
          {data.map((todo, index) => {
            return (
              <Card
                key={index}
                index={index}
                todayTodo={todayTodo}
                unix={todo.unix}
                text={todo.text}
                status={todo.status}
                onComplete={onComplete}
                onDelete={onDelete} />
            )
          })}
        </div>}
      </div>
    )
  }
}

History.propTypes = {
  data: PropTypes.array.isRequired,
  todayTodo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  activeHistory: PropTypes.bool.isRequired,
  toggleHistory: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default History;