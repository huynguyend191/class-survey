import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SurveyIcon from '../../assets/icons/survey.png';
import { Button, Menu, MenuItem } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';


class NavigationBar extends Component {
  state = {
    openDiaglog: false,
    anchorEl: null,
  }


  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseModal = () => {
    this.setState({openDiaglog: false});
  }

  handleOpenModal = () => {
    this.setState({openDiaglog: true});
  }

  render() {
    const { anchorEl } = this.state;
    return (
      <div className={classes.NavigationBar}>
        <div className={classes.NavContent}>
          <img className={classes.SurveyIcon} src={SurveyIcon} alt='Class Survey' />
          <p className={classes.Header}>
            CLASS SURVEY
          </p>
        </div>
        <Button
          className={classes.Account}
          onClick={this.handleClick}
        >
          <AccountCircle style={{ margin: 'auto' }} color="primary" />
          <p className={classes.Username}>{this.props.username}</p>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem style={{ height: '10px' }}>
            <Button className={classes.SignOut} component={Link} to="/signout">
              <ExitToApp />Sign Out
            </Button>
          </MenuItem>
        </Menu>
      </div>
    );
  }
 
}

export default NavigationBar;