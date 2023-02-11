import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import RoundSlider from "./RoundSlider";

class App extends Component {  

  constructor (props) {  
    super(props);  
    this.state = {  
      startDate: new Date(),
      convertedDate: "",
      route: ""
    };  
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRouteName = this.handleChangeRouteName.bind(this);  
    this.onFormSubmit = this.onFormSubmit.bind(this);  
    this.onMilleniumValChange = this.onMilleniumValChange.bind(this);
    this.onYearValChange = this.onYearValChange.bind(this);
    this.onMonthValChange = this.onMonthValChange.bind(this);
    this.onDayValChange = this.onDayValChange.bind(this);
    this.getDaysInMonth = this.getDaysInMonth.bind(this);
  }  

  handleChange(date) {  
    this.setState({  
      startDate: date
    });  
  }

  handleChangeRouteName(e) {
    this.setState({
      route: e.target.value
    });
  }  

  onFormSubmit(e) {
    e.preventDefault();
    var routeName = this.state.route;
    var startdate = this.state.startDate;
    this.fetchDatesConversion(routeName);
    console.log(startdate);
  }

  async fetchDatesConversion(routeName)
  {
    var datesServiceUrl = "https://uwses-dates-service.azurewebsites.net/api/";
    var month = this.state.startDate.getMonth() + 1; // getMonth() causes an off by one error
    var date = this.state.startDate.getDate();
    var year = this.state.startDate.getFullYear();


    var url = datesServiceUrl + routeName + "?input=" + 
      month + "/" + date + "/" + year;
   
    try {
      const response = await fetch(url, {mode: 'cors'});
      const resText = await response.text();
      this.setConvertText(resText);
    }
    catch (e) {
      this.setConvertText(e);
    }
  }



  setConvertText(text) {
    this.setState({  
      convertedDate: text
    });
    console.log(this.state.convertedDate);
    //console.log("Hello");
  }

  updateMilleniumTooltip = function(e) {
    return `${"Millenium: " + e.value}`;
  };

  updateYearTooltip = function(e) {
    return `${"Year: " + e.value}`;
  };

  updateMonthTooltip = function(e) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May",
    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${"Month: " + months[e.value - 1]}`;
  };

  updateDayTooltip = function(e) {
    return `${"Day: " + e.value}`;
  };

  onMilleniumValChange = function(e) {
    this.state.startDate.setFullYear(e.value * 1000)
    this.setState({})
  };

  onYearValChange = function(e) {
    this.state.startDate.setFullYear(e.value)
    this.setState({})
  }

  onMonthValChange = function(e) {
    this.state.startDate.setMonth(e.value - 1)
    this.setState({})
  }

  onDayValChange = function(e) {
    this.state.startDate.setDate(e.value)
    this.setState({})
  }

  getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  }


  render() { 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Top-row">
          <div className="First-slider">
            <RoundSlider
              sliderType="min-range"
              startAngle={90}
              value={Math.floor(this.state.startDate.getFullYear() / 1000)}
              update={this.onMilleniumValChange}
              radius="60"
              width="6"
              min="0"
              max="9"
              step="1"
              tooltipFormat={this.updateMilleniumTooltip}
              handleSize="+15"
              handleShape="dot"
              borderColor="#282c34"
              rangeColor="orange"
              pathColor="#4a5872"
            />
          </div>
          <div className="Second-slider">
            <RoundSlider
              sliderType="min-range"
              startAngle={90}
              value={this.state.startDate.getFullYear()}
              update={this.onYearValChange}
              radius="120"
              width="6"
              handleSize="+15"
              handleShape="dot"
              borderColor="#282c34"
              rangeColor="orange"
              pathColor="#4a5872"
              min={ 
                Math.floor(this.state.startDate.getFullYear() / 1000) 
                * 1000
              }
              max={ 
                Math.floor(this.state.startDate.getFullYear() / 1000) 
                * 1000 + 999
              }
              step="1"
              tooltipFormat={this.updateYearTooltip}
            />
          </div>
        </div>
        <div className="Bottom-row">
          <div className="Third-slider">
            <RoundSlider
              sliderType="min-range"
              startAngle={90}
              value={this.state.startDate.getMonth() + 1}
              update={this.onMonthValChange}
              radius="90"
              width="6"
              min={1}
              max={12}
              step="1"
              tooltipFormat={this.updateMonthTooltip}
              handleSize="+15"
              handleShape="dot"
              borderColor="#282c34"
              rangeColor="orange"
              pathColor="#4a5872"
            />
          </div>
          <div className="Fourth-slider">
            <RoundSlider
              sliderType="min-range"
              startAngle={90}
              value={this.state.startDate.getDate()}
              // update={this.onDayValChange}
              radius="90"
              width="6"
              min={1}
              max={this.getDaysInMonth(this.state.startDate.getFullYear(), this.state.startDate.getMonth() + 1)}
              step="1"
              tooltipFormat={this.updateDayTooltip}
              handleSize="+15"
              handleShape="dot"
              borderColor="#282c34"
              rangeColor="orange"
              pathColor="#4a5872"
            />
          </div>
        </div>
      </header>
      <div>
      
      </div>
    </div>
  );}
}

export default App;
