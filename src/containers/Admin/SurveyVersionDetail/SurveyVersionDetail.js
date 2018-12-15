import React, { Component } from 'react';
import { Dialog, Paper, Icon } from '@material-ui/core';
import classes from './SurveyVersionDetail.module.css';
class SurveyVersionDetail extends Component {
  componentDidMount(){
    console.log(this.props.version)
  }
  handleClose = () => {
    this.props.history.push(this.props.returnPath);
  }
  render() {
    return (
      <Dialog
        open={true}
        className={classes.DialogContainer}
        fullWidth={true}
        maxWidth = {'md'}
      >
        <Paper className={classes.SurveyVerDetail}>
          <div className={classes.EditHeader}>
            Survey Form Detail
            <Icon className={classes.CloseButton} onClick={this.handleClose}>close</Icon>
          </div>
      
        </Paper>
      </Dialog>
     
    );
  }
}

export default SurveyVersionDetail;