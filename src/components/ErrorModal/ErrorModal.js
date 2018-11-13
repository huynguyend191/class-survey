import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import classes from './ErrorModal.module.css';

function ErrorModal(props) {
  return(
    <Dialog
      open={props.isOpen}
      onClick={props.handleCloseModal}
    >
      <DialogTitle className={classes.ErrorModal}>
        <p className={classes.ErrorMsg}>{props.error}</p>
      </DialogTitle>
      <DialogContent className={classes.ErrorMsg}>
        Please try again!
      </DialogContent>
    </Dialog>
  );
}

export default ErrorModal;