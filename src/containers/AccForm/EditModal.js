import React, { Component } from 'react';
import { Dialog, Paper, Button, Icon } from '@material-ui/core';
import classes from './EditModal.module.css';

class EditModal extends Component{

  componentDidMount() {
    if(this.props.accType === 'student') {
      this.setState({
        account: { 
        ...this.state.account,
        year:{
          label: 'Khóa',
          elementType: 'text',
          value: this.props.account.year,
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
      username: {
        label: 'Tên đăng nhập',
        elementType: 'text',
        value: this.props.account.username,
        validation: { 
          required: true
        },
        valid: true,
      },
      fullname: {
        label: 'Họ và tên',
        elementType: 'text',
        value: this.props.account.fullname,
        validation: { 
          required: true
        },
        valid: true,
      },
      VUNemail: {
        label: 'VNU email',
        elementType: 'email',
        value: this.props.account.VNUemail,
        validation: { 
          required: true,
          isEmail: true
        },
        valid: true,
      },
    
    },
    formIsValid: true
  }
 
  onInputChangeHandler = (event, id) => {
    const updatedForm = {
      ...this.state.account
    };
    const updatedElement = {
      ...updatedForm[id]
    };
    updatedElement.value = event.target.value;
    updatedForm[id] = updatedElement;
    updatedElement.touched = true;
    updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
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
    this.props.submit(this.props.account.id, formData);
    this.handleClose();
  }

  checkValidity (value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
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
            <div key={formElement.id} className={classes.InputHolder}>
              <p className={classes.InputLabel}>{formElement.config.label}</p>
              <input 
                className={classes.Input}
                value={formElement.config.value}
                onChange={(event) => this.onInputChangeHandler(event, formElement.id)} 
              />
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
            <Icon className={classes.CloseButton} onClick={this.handleClose}>close</Icon>
          </div>
          {form}
      
        </Paper>
      </Dialog>
    );
  }
}

export default EditModal;