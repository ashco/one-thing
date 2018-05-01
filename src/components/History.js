import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import menu from '../menu_icon.svg';
import { autoFontSize } from '../helpers/helpers';

class History extends React.Component {
  componentDidMount = () => {
    autoFontSize();
    window.addEventListener('resize', autoFontSize);
  }

  componentDidUpdate = () => autoFontSize();

  componentWillUnmount = () => window.removeEventListener('resize', autoFontSize);

  toggleMenu = () => {
    this.props.toggleHistory();
    this.props.toggleMain();
  }

  render () {
    const { data, todayTodo, activeHistory, onComplete, onDelete } = this.props;

    // let cardMap =


    return (
      <div className="History" style={{ height: activeHistory ? '100vh' : '10vh' }}>
        <div className="History--header">
          <button className="menu-btn" onClick={this.toggleMenu}>
            <img src={menu} alt="Menu" />
          </button>
          {activeHistory ? <h2>History</h2> : <h1>One Thing</h1>}
        </div>
        {activeHistory &&
          <div className="History--main">
          {data.length === 0 || data.length === 1 && todayTodo && data[0].status === false
            ? <p className="History-filler">You should make history</p>
            : data.map((todo, index) => {
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
  activeMain: PropTypes.bool.isRequired,
  activeHistory: PropTypes.bool.isRequired,
  toggleMain: PropTypes.func.isRequired,
  toggleHistory: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default History;