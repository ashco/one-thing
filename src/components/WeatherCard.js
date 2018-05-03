import React from 'react';
import { getWeather } from '../helpers/helpers';

class WeatherCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      location: null
    }
  }

  componentDidMount = () => {
    const thing = getWeather('98102');
    console.log(thing);

  }



  render () {



    return (
      <div>
        <h2 className='weather'>Weather goes here...</h2>
      </div>
    )
  }
}

export default WeatherCard;