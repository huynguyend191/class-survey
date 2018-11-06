import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SurveyIcon from '../../assets/icons/survey.png';
import { Tooltip, Button } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';

function NavigationBar(props) {
  return (
    <div className={classes.NavigationBar}>
      <div className={classes.NavContent}>
        <img className={classes.SurveyIcon} src={SurveyIcon} alt='Class Survey' />
        <p className={classes.Header}>
          CLASS SURVEY
        </p>
      </div>
      <div className={classes.Account}>
        <AccountCircle style={{ margin: 'auto' }} color="primary" />
        <p className={classes.Username}> {props.username}</p>
        <Tooltip title="Sign Out">
          <Button style={{ backgroundColor: 'transparent' }} component={Link} to="/signout">
            <ExitToApp />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default NavigationBar;