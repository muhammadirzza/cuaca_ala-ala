import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Weather from './components/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from './components/form'

// api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key="33553b33b6150ada767657473f605afa"

class App extends Component{
    
    state = {
      city:'',
      country:'',
      icon:'',
      celsius:'',
      temp_max:0,
      temp_min:0,
      description:'',
      error:false,
      weathericon : {
        Thunderstorm:"wi-thunderstorm",
        Drizzle:"wi-sleet",
        Rain:"wi-storm-showers",
        Snow:"wi-snow",
        Atmosphere:"wi-fog",
        Clear:"wi-day-sunny",
        Clouds:"wi-day-fog"
      }
    }

  

  
  calCelcius = (temp) => {
    let cel=Math.floor(temp-273.15)
    return cel
  }

  getWeathericon = (icons, rangeID) => {
    switch(true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({icon:this.state.weathericon.Thunderstorm})
        break
      case rangeID >= 300 && rangeID <= 321:
        this.setState({icon:this.state.weathericon.Drizzle})
        break
      case rangeID >= 500 && rangeID <= 531:
        this.setState({icon:this.state.weathericon.Rain})
        break
      case rangeID >= 600 && rangeID <= 622:
        this.setState({icon:this.state.weathericon.Snow})
        break
      case rangeID >= 701 && rangeID <= 781:
        this.setState({icon:this.state.weathericon.Atmosphere})
        break
      case rangeID === 800:
        this.setState({icon:this.state.weathericon.Clear})
        break
      case rangeID >= 801 && rangeID <= 804:
        this.setState({icon:this.state.weathericon.Clouds})
        break
      default:
        this.setState({icon:this.state.weathericon.Clouds})
        break
    }
  }

  getWeather = async(e) => {
    e.preventDefault()
    
    const city=e.target.elements.city.value
    const country=e.target.elements.country.value

    if(city && country) {
      const api_call = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
        )
      const response = await api_call.json()
      console.log(response)
      this.setState({
        city:`${response.name}, ${response.sys.country}`,
        // country:response.sys.country,
        celsius:this.calCelcius(response.main.temp),
        temp_max:this.calCelcius(response.main.temp_max),
        temp_min:this.calCelcius(response.main.temp_min),
        description:response.weather[0].description,
        error:false
      })
      this.getWeathericon(this.state.weathericon, response.weather[0].id)
      // this.actionclear(e)
    }else{
      this.setState({error:true})
    }
  }

  // actionclear = (e) => {
  //   e.preventDefault()
  //   this.setState({error:false})
  //   console.log(this.state.error)
  // }

  toggle = () => {
    this.setState({error:false})
  }

  render() {
    return (
      <div className="App" onClick={this.toggle}>
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather 
          city={this.state.city} 
          country={this.state.country} 
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weathericon={this.state.icon}
          />
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <Weather/>
//     </div>
//   );
// }

export default App;
