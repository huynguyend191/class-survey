import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Clock from 'react-live-clock';
import classes from './Home.module.css';

class Home extends Component {


  render() {
    return (
      <div className={classes.Home}>
        <div className={classes.LeftArea}>
          <h1>CLASS SURVEY SYSTEM</h1>
          <p>Welcome</p>
        </div>
        <div className={classes.RightArea}>
        <div className={classes.Sticky}>
          <div className={classes.Clock}>
            <Clock
              style={{fontSize: '1.5em'}}
              format={'h:mm:ssa'}
              ticking={true} 
            />
          </div>
            <Calendar className={classes.Calendar} value={new Date()}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;