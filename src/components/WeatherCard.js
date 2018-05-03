import React from 'react';
import { getWeatherData } from '../helpers/helpers';

class WeatherCard extends React.Component {

  componentDidMount = () => {
    getWeatherData('98102');

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