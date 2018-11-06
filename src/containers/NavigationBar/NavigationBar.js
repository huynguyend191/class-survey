import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import SurveyIcon from '../../assets/icons/survey.png';
import { Tooltip, Button, Dialog, Slide, DialogTitle, DialogActions } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class NavigationBar extends Component {
  state = {
    openDiaglog: false,
  }

  handleCloseModal = () => {
    this.setState({openDiaglog: false});
  }

  handleOpenModal = () => {
    this.setState({openDiaglog: true});
  }

  render() {
    const confirmLogout = (
      <Dialog
        onClick={this.handleCloseModal}
        open={this.state.openDiaglog}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <p style={{fontSize: '16px'}}>Do you want to signout?</p>
        </DialogTitle>
        <DialogActions>
          <Button onClick={this.handleCloseModal} color="secondary">
            No
          </Button>
          <Button 
            color="primary" 
            autoFocus 
            component={Link} 
            to="/signout"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
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
          <p className={classes.Username}> {this.props.username}</p>
          <Tooltip 
            title="Sign Out" 
            disableFocusListener
          > 
            <Button style={{ backgroundColor: 'transparent' }} onClick={this.handleOpenModal}>
              <ExitToApp />
            </Button>
          </Tooltip>
        </div>
        {confirmLogout}
      </div>
    );
  }
 
}

export default NavigationBar;