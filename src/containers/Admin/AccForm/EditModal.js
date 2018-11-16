import React, { Component } from 'react';
import { Dialog, Paper, Button, Icon } from '@material-ui/core';
import classes from './EditModal.module.css';
import checkValidity  from '../../../utils/checkValidity';

class EditModal extends Component{

  componentDidMount() {
    if(this.props.accType === 'student') {
      this.setState({
        account: { 
        ...this.state.account,
        year:{
          label: 'Khóa đào tạo',
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
        message: null
      },
      password: {
        label: 'Mật khẩu mới',
        elementType: 'text',
        value: '',
        validation: { 
          required: false,
        },
        valid: true,
        message: null
      },
      fullname: {
        label: 'Họ và tên',
        elementType: 'text',
        value: this.props.account.fullname,
        validation: { 
          required: true
        },
        valid: true,
        message: null        
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
        message: null
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
    this.props.submit(this.props.account.id, formData);
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
            <Icon className={classes.CloseButton} onClick={this.handleClose}>close</Icon>
          </div>
          {form}
      
        </Paper>
      </Dialog>
    );
  }
}

export default EditModal;