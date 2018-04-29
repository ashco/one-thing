import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import menu from '../menu_icon_2.svg';
import { autoFontSize } from '../helpers/helpers';

class History extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      active: true
    }
  }

  componentDidMount () {
    autoFontSize();
    this.windowActivator();
    window.addEventListener('resize', autoFontSize);
    window.addEventListener('resize', this.windowActivator);
  }

  componentWillUnmount = () => window.removeEventListener('resize', autoFontSize);

  componentDidUpdate = () => autoFontSize();

  windowActivator = () => {
    if (window.innerWidth > 768) {
      this.setState({ active: true });
      return;
    }
    console.log('trigger');
    this.setState({ active: false })
  }

  toggleMenu = () => {
    const toggle = !this.state.active;

    this.setState({ active: toggle })
    console.log(this.state);
  }

  render () {
    const { active } = this.state;
    const { data, todayTodo, onComplete, onDelete } = this.props;

    return (
      <div className="History" style={{ height: active ? '100vh' : '10vh' }}>
        <div className="History--header">
          <button className="menu-btn" onClick={this.toggleMenu}>
            <img src={menu} alt="Menu" />
          </button>
          <h2>History</h2>
        </div>
        {active &&
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
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default History;