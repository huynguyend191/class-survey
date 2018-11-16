import React, { Component } from 'react';
import { Dialog, Paper, Button, Icon } from '@material-ui/core';
import classes from './EditModal.module.css';

class EditModal extends Component{

  componentDidMount(){
    this.setState({...this.props.account, password: ''});
    
  }

  state = {
  }
 
  onInputChangeHandler = (event) => {
    console.log(event.target.id)
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleClose = () => {
    this.props.history.replace(this.props.path);
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.submit(this.state.id, this.state);
  }


  render() {
    let account = this.state;
      let form=(
        <form onSubmit={this.submitForm}>
          { 
            Object.keys(account).map((key, index) => {
              if (key === 'password'){
                return(
                  <div key={key} className={classes.InputHolder}>
                    <p className={classes.InputLabel}>Password</p>
                    <input
                      id={key}
                      placeholder="Enter new password"
                      className={classes.Input}
                      value={account[key]}
                      onChange={this.onInputChangeHandler}
                      type="password"
                    />
                  </div>
                  
                )
              } else return (
                key !== 'id' ? 
                <div key={key} className={classes.InputHolder}>
                  <p className={classes.InputLabel}>{this.props.label[index-1]}</p>
                  <input
                    required
                    id={key}
                    className={classes.Input}
                    value={account[key]}
                    onChange={this.onInputChangeHandler}
                  />
                </div>
                : null
              );
            })
          }
          <div className={classes.ButtonHolder}>
            <Button 
              className={classes.SignInButton}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
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