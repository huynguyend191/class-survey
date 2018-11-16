import React, { Component } from 'react';
import Calendar from 'react-calendar';
import classes from './Home.module.css';

class Home extends Component {
  render() {
    return (
      <div className={classes.Home}>
        <Calendar  value={new Date()}/>
      </div>
    );
  }
}

export default Home;