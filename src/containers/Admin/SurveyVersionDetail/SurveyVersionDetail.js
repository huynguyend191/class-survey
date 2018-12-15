import React, { Component } from 'react';
import { Dialog, Paper, IconButton } from '@material-ui/core';
import Close from '@material-ui/icons/Cancel';
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
          <div className={classes.Header}>
            <p style={{fontSize: '24px', margin: '0', fontWeight: '500'}}>SURVEY DETAIL</p>
            <IconButton className={classes.CloseButton} onClick={this.handleClose}><Close color="primary" /></IconButton>
          </div>
          <div className={classes.Content}>
            Content
          </div>
        </Paper>
      </Dialog>
     
    );
  }
}

export default SurveyVersionDetail;