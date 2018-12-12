import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SurveyIcon from '../../assets/icons/survey.png';
import { Button, Menu, MenuItem } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import AccountCircle from '@material-ui/icons/AccountCircle';


class NavigationBar extends Component {
  state = {
    openDiaglog: false,
    anchorEl: null,
  }

  onRedirect = () => {
    this.props.history.push('/surveys');
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
        <div className={classes.NavContent} onClick={this.onRedirect}>
          <img className={classes.SurveyIcon} src={SurveyIcon} alt='Class Survey' draggable="false" />
          <p className={classes.Header}>CLASS SURVEY</p>
        </div>
        <div
          className={classes.Account}
          onClick={this.handleClick}
        >
          <AccountCircle style={{ margin: 'auto' }} color="primary" />
          <p className={classes.Username} onClick={this.handleClick}>{this.props.username}</p>
          <ArrowDown style={{ margin: 'auto', height: '20px' }} color="primary"  />
        </div>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem style={{ height: '10px'}}>
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