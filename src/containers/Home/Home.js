import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Clock from 'react-clock';
import classes from './Home.module.css';

class Home extends Component {

  state = {
    date: new Date(),
  }

  componentDidMount() {
    setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }

  render() {
    return (
      <div className={classes.Home}>
        <div className={classes.LeftArea}>
          <h1>CLASS SURVEY SYSTEM</h1>
        </div>
        <div className={classes.RightArea}>
          <Clock className={classes.Clock} value={this.state.date}/>
          <Calendar className={classes.Calendar} value={new Date()}/>
        </div>
      </div>
    );
  }
}

export default Home;