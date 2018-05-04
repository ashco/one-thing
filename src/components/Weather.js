import React from 'react';
import { getWeatherData, getWeather } from '../helpers/helpers';
import img01d from '../images/weather-icons/01d.svg'

class Weather extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      location: 'Seattle',
      weatherObj: null
    }
  }

  handleWeather = () => {
    const { location } = this.state;
    const weatherObj = getWeather(location);

    this.setState({ weatherObj });
    console.log(weatherObj);
  }

  componentDidMount () {
    this.handleWeather();
  }

  render () {
    const { location, weatherObj } = this.state;
    return (
      <div className='Weather'>
      {!weatherObj
        ? <div className='Weather--container'>
            <h2 className='loading'>Loading</h2>
          </div>
        : <div className='Weather--container'>
            <img src={img01d} alt="thing"/>
            <div className='Weather--textbox'>
              <h2 className='Weather--description'>Scattered Clouds</h2>
              <h3 className='city'>- Seattle -</h3>
            </div>
            <p className="temp">74&#176;</p>
          </div>
      }
      </div>
    );
  }
}

export default Weather;