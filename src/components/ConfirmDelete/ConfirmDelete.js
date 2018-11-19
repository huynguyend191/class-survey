import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';


function ConfirmDelete(props) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
    >
      <DialogTitle>
        <p style={{fontSize: '16px'}}>Do you want to delete this?</p>
      </DialogTitle>
      <DialogActions>
        <Button 
          onClick={() => {
            props.confirmDelete(props.deleteId);
            props.handleClose();
          }} 
          color="primary">
          Yes
        </Button>
        <Button onClick={props.handleClose} color="secondary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default ConfirmDelete;