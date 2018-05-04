import React from 'react';
import { getWeatherData, getWeather, capitalizer } from '../helpers/helpers';
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

class Weather extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      location: 'Seattle',
      weatherObj: null,
      img: null,
      svgArr: [svg01d, svg01n, svg02d, svg02n, svg03d, svg03n, svg04d, svg04n, svg09d, svg09n, svg10d, svg10n, svg11d, svg11n, svg13d, svg13n, svg50d, svg50n],
      hover: false,
      input: '',
    }
  }

  setLocation = () => {
    console.log(this.state);
    this.setState({ location: this.state.value });
    this.handleWeather();
    console.log('trigger:' , this.state);
  }

  clearLocation = () => {
    this.setState({
      location: null,
      weatherObj: null,
      img: null,
      hover: true,
    })
  }

  handleHover = () => {
    this.setState({ hover: !this.state.hover });
    console.log(this.state.hover);
  }

  handleWeather = () => {
    const { location } = this.state;
    getWeather(location)
      .then(data => {
        console.log(data);
        this.setState({ weatherObj: data });
        this.createImg(data.icon);
      });
  }

  handleChange = (event) => {
    const value = event.target.value;

    if (value.length >= 40) {
      console.log('Character Limit Reached');
      return;
    }
    this.setState(() => ({ input: value }));
  }

  createImg (icon) {
    const { svgArr } = this.state;
    const index = svgArr.findIndex(img => img.includes(icon));
    const img = svgArr[index];

    this.setState({ img });
  }

  componentDidMount () {
    const weatherBox = document.querySelector('.Weather--container');
    weatherBox.addEventListener('mouseenter', this.handleHover);
    weatherBox.addEventListener('mouseleave', this.handleHover);
    this.handleWeather();
  }

  render () {
    const { location, weatherObj, img, hover, input } = this.state;

    return (
      <div className='Weather'>

        <div className='Weather--container'>
          {weatherObj && <img src={img} alt={weatherObj.main}/>}
          <div className='Weather--textbox'>
            <input
              type="text"
              id="location"
              value={input}
              onChange={this.handleChange}
              />
            {input
              ? <h3 className='location location--hover'><a onClick={this.setLocation}>Set</a></h3>
              : <h3 className='location location--hover'><a onClick={this.clearLocation}>Clear</a></h3>}
          </div>
          {/* <p className="temp">{Math.floor(weatherObj.temp * 1.8 - 459.67)}&#176;</p> */}
        </div>
      {/* {!weatherObj
        ? <div className='Weather--container'>
            <h2 className='loading'>Loading</h2>
          </div>
        : <div className='Weather--container'>
            <img src={img} alt={weatherObj.main}/>
            <div className='Weather--textbox'>
              <h2 className='Weather--description'>{capitalizer(weatherObj.description)}</h2>
              {hover || !weatherObj
                ? <h3 className='location location--hover'><a onClick={this.removeLocation}>Change</a></h3>
                : <h3 className='location'>- {location} -</h3>}
            </div>
            <p className="temp">{Math.floor(weatherObj.temp * 1.8 - 459.67)}&#176;</p>
          </div>
      } */}
      </div>
    );
  }
}

export default Weather;