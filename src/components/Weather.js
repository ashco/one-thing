import React from 'react';
import { getWeather, capitalizer, getLocalStorage, updateLocalStorage } from '../helpers/helpers';
import svg01d from '../images/weather-icons/01d.svg';
import svg01n from '../images/weather-icons/01n.svg';
import svg02d from '../images/weather-icons/02d.svg';
import svg02n from '../images/weather-icons/02n.svg';
import svg03d from '../images/weather-icons/03d.svg';
import svg03n from '../images/weather-icons/03n.svg';
import svg04d from '../images/weather-icons/04d.svg';
import svg04n from '../images/weather-icons/04n.svg';
import svg09d from '../images/weather-icons/09d.svg';
import svg09n from '../images/weather-icons/09n.svg';
import svg10d from '../images/weather-icons/10d.svg';
import svg10n from '../images/weather-icons/10n.svg';
import svg11d from '../images/weather-icons/11d.svg';
import svg11n from '../images/weather-icons/11n.svg';
import svg13d from '../images/weather-icons/13d.svg';
import svg13n from '../images/weather-icons/13n.svg';
import svg50d from '../images/weather-icons/50d.svg';
import svg50n from '../images/weather-icons/50n.svg';


class WeatherInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input: '',
    }
  }

  handleChange = (event) => {
    const value = event.target.value;

    if (value.length >= 40) {
      console.log('Character Limit Reached');
      return;
    }
    this.setState({ input: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { input } = this.state;
    const { updateLocation, updateWeather } = this.props;

    updateLocation(input);
  }

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <input
          className='Weather--input'
          type="text"
          onChange={this.handleChange}/>
        <button className='Weather--input__btn' type='submit'>- Set Location -</button>
      </form>
    );
  }
}


class Weather extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      location: 'Seattle',
      weatherObj: null,
      img: null,
      svgArr: [svg01d, svg01n, svg02d, svg02n, svg03d, svg03n, svg04d, svg04n, svg09d, svg09n, svg10d, svg10n, svg11d, svg11n, svg13d, svg13n, svg50d, svg50n],
      hover: false,
    }
  }

  removeLocation = () => {
    this.setState({
      location: '',
      weatherObj: null,
      img: null,
    });
    updateLocalStorage('location', this.state.location);
  }

  handleLocation = (location) => {
    this.setState({ location }, this.handleWeather);
    updateLocalStorage('location', this.state.location);
  }

  handleWeather = () => {
    const { location } = this.state;

    if (location) {
      getWeather(location)
        .then(data => {
          this.setState({ weatherObj: data });
          this.createImg(data.icon);
        })
        .catch(error => {
          console.log(error);
          return;
        });
    }
  }

  addHover = () => this.setState({ hover: true });

  removeHover = () => this.setState({ hover: false });

  createImg = (icon) => {
    const { svgArr } = this.state;
    const index = svgArr.findIndex(img => img.includes(icon));
    const img = svgArr[index];

    this.setState({ img });
  }

  componentDidMount = () => {
    const location = getLocalStorage('location') || 'Seattle';

    console.log(location);
    // this.setState({ location });
    this.handleWeather();
    document.querySelector('.Weather').addEventListener('pointerover', this.addHover);
    document.querySelector('.Weather').addEventListener('pointerout', this.removeHover);
    document.querySelector('.Weather').addEventListener('click', this.removeLocation);
  }

  componentWillUnmount = () => {
    this.handleWeather();
    document.querySelector('.Weather').removeEventListener('pointerover', this.addHover);
    document.querySelector('.Weather').removeEventListener('pointerout', this.removeHover);
    document.querySelector('.Weather').removeEventListener('click', this.removeLocation);
  }

  render () {
    const { location, weatherObj, img, hover } = this.state;

    return (
      <div className='Weather'>
        {location && !weatherObj &&
          <div className='Weather--container'>
            <h2 className='loading'>Loading</h2>
          </div>}
        {location && weatherObj &&
          <div className='Weather--container'>
            <img src={img} alt={weatherObj.main}/>
            <div className='Weather--textbox'>
              <h2 className='Weather--description'>{capitalizer(weatherObj.description)}</h2>
              {hover
                ? <h3 className='location'>- Remove? -</h3>
                : <h3 className='location'>- {capitalizer(location)} -</h3>}
            </div>
            <p className="temp">{Math.floor(weatherObj.temp * 1.8 - 459.67)}&#176;</p>
          </div>}
        {!location &&
          <WeatherInput
            updateLocation={this.handleLocation}
            updateWeather={this.handleWeather} />
        }
      </div>
    );
  }
}

export default Weather;