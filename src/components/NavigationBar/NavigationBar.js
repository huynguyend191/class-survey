import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SurveyIcon from '../../assets/icons/survey.png';

function NavigationBar(props) {
  return (
    <div className={classes.NavigationBar}>
      <img className={classes.SurveyIcon} src={SurveyIcon} alt='Class Survey'/>
      <p className={classes.Header}>
        CLASS SURVEY
      </p>
      <p className={classes.Username}> {props.username}</p>
      <NavLink className={classes.SignOut} to='/signout'>Sign Out</NavLink>
    </div>
  );
}

export default NavigationBar;