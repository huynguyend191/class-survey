import React, { Component } from 'react';
import { Dialog, Paper, Button, IconButton } from '@material-ui/core';
import Close from '@material-ui/icons/Cancel';
import classes from './EditModal.module.css';
import checkValidity  from '../../../utils/checkValidity';

class EditModal extends Component{

  componentDidMount() {
    //check account type
    if(this.props.accType === 'student') {
      this.setState({
        account: { 
        ...this.state.account,
        Class:{
          label: 'Class',
          elementType: 'text',
          value: this.props.account.Class,
          validation: { 
            required: true
          },
          valid: true,
        }}
      })
    }
  }

  state = {
    account: {
      Username: {
        label: 'Username',
        elementType: 'text',
        value: this.props.account.Username,
        validation: { 
          required: true
        },
        valid: true,
        message: null
      },
      Password: {
        label: 'New Password',
        elementType: 'text',
        value: '',
        validation: { 
          required: false,
        },
        valid: true,
        message: null
      },
      Name: {
        label: 'Fullname',
        elementType: 'text',
        value: this.props.account.Name,
        validation: { 
          required: true
        },
        valid: true,
        message: null        
      },
      Vnumail: {
        label: 'VNUmail',
        elementType: 'email',
        value: this.props.account.Vnumail,
        validation: { 
          required: true,
          isEmail: true
        },
        valid: true,
        message: null
      },
      
    
    },
    formIsValid: true
  }
 
  onInputChangeHandler = (event, id) => {
    //handle input change + validate
    const updatedForm = {
      ...this.state.account
    };
    const updatedElement = {
      ...updatedForm[id]
    };
    updatedElement.value = event.target.value;
    updatedForm[id] = updatedElement;
    updatedElement.touched = true;
    updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation).isValid;
    updatedElement.message = checkValidity(updatedElement.value, updatedElement.validation).message;
    let formIsValid = true;
    for(let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({account: updatedForm, formIsValid: formIsValid})
  }

  handleClose = () => {
    this.props.history.replace(this.props.path);
  }

  submitForm = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.account) {
      formData[formElementIdentifier] = this.state.account[formElementIdentifier].value;
    }
    this.props.submit(this.props.account.Id, {...this.props.account, ...formData});
    this.handleClose();
  }


  render() {
    const inputArrays = [];
    for (let key in this.state.account) {
      if(this.state.account[key]) {
        inputArrays.push({
          id: key,
          config: this.state.account[key]
        })
      }
    }
    let form=(
      <form onSubmit={this.submitForm}>
        { 
          inputArrays.map(formElement => (
            <div key={formElement.id} >
              <div className={classes.InputHolder}>
                <p className={classes.InputLabel}>{formElement.config.label}</p>
                <input 
                  className={formElement.config.valid ? classes.Input : classes.InputError}
                  value={formElement.config.value}
                  type={formElement.config.elementType}
                  onChange={(event) => this.onInputChangeHandler(event, formElement.id)}
                />
              </div>
              <div className={classes.ErrorMsg}>{formElement.config.message}</div>
            </div>
          ))
        }
        <div className={classes.ButtonHolder}>
          <Button 
            className={classes.SignInButton}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!this.state.formIsValid}
          >Submit</Button>
        </div>
        
      </form>
      );  
    

    return (
      <Dialog
        open={true}
      > 
        <Paper className={classes.EditModal}>
          <div className={classes.EditHeader}>
            Edit Account
            <IconButton className={classes.CloseButton} onClick={this.handleClose}><Close color="primary" /></IconButton>
          </div>
          {form}
      
        </Paper>
      </Dialog>
    );
  }
}

export default EditModal;