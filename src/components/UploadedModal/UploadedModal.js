import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import classes from './UploadedModal.module.css';

function UploadedModal(props) {
  return (
    <Dialog
      open={props.isOpen}
      onClick={props.handleCloseModal}
    >
      <DialogTitle className={classes.UploadedModal}>
        <p className={classes.Msg}>Successfully Uploaded</p>
      </DialogTitle>
    </Dialog>
  );
}

export default UploadedModal;