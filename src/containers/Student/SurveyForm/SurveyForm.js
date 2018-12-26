import React, { Component } from 'react';
import { Dialog, IconButton, RadioGroup, Radio, Button } from '@material-ui/core';
import Close from '@material-ui/icons/Cancel';
import classes from './SurveyForm.module.css';
import  { invertObjectServerToClient } from '../../../utils/invertObject';
import axios from '../../../utils/axiosConfig';

class SurveyForm extends Component {
  state = {
    surveyContent: null,
    formIsValid: false
  }
  componentDidMount() {
    let surveyContent = {};
    //create state for form
    const category = Object.keys(this.props.surveyInfo.content);
    for (let index in category) {
      surveyContent = {...surveyContent, ...{[category[index]] : '0'}}
    }
    this.setState({
      surveyContent: surveyContent
    })
  }

  handleChange = (event, key) => {
    const surveyContent = this.state.surveyContent;
    // create new object with value selected
    const result = {...surveyContent, ...{[key]: event.target.value }}

    this.setState({
      surveyContent: result
    })
    this.checkFormValidation(result);

  };

  handleClose = () => {
    this.props.history.push(this.props.returnPath);
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    axios.post('/api/Forms', {
      StudentClassId: this.props.surveyInfo.studentClassId,
      Content: JSON.stringify(this.state.surveyContent)
    })
    .then(result => {
      console.log('OK')
    })
    .catch(error => {
      console.log('GG ez')
    })
  }

  checkFormValidation = (form) => {
    // if 0 doesn't exist, valid
    const isValid = Object.values(form).indexOf('0') < 0
    this.setState({formIsValid: isValid});
  }

  render() {
    let surveyForm = null;
    if (this.state.surveyContent) {
      
      const formInfo = invertObjectServerToClient(this.props.surveyInfo.content);
      let surveyFormContent = Object.keys(formInfo).map((key, index) => {
        const listItems = formInfo[key].map(item => {
          //return sub category
          return (
            <div key={item} className={classes.RadioGroup}>
              <p style={{width: '60%'}}>{item}</p>
              <RadioGroup 
                style={{ display: 'flex', flexDirection:'row' }} 
                onChange={(event) => this.handleChange(event, item)}
                value={this.state.surveyContent[item]}
              > 
                <Radio color="primary" value="1" />
                <Radio color="primary" value="2" />
                <Radio color="primary" value="3" />
                <Radio color="primary" value="4" />
                <Radio color="primary" value="5" />
              </RadioGroup>
            </div>
            
          )
        })
        return (
            <div key={key} style={{borderBottom: '1px solid rgb(163, 163, 163)'}}>
              <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                <p style={{fontWeight: '500'}}>{index+1}. {key}</p>
                <div style={{display: 'flex', flexDirection:'row'}}>
                  <p className={classes.RadioLabel}>1</p>
                  <p className={classes.RadioLabel}>2</p>
                  <p className={classes.RadioLabel}>3</p>
                  <p className={classes.RadioLabel}>4</p>
                  <p className={classes.RadioLabel}>5</p>
                </div>
              </div>
              {listItems}
              
            </div>
           
        )
      })
      surveyForm = (
        <form onSubmit={this.handleSubmitForm}>
          {surveyFormContent} 
          <div className={classes.ButtonHolder}>
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!this.state.formIsValid}
          >Submit</Button>
          </div>
        </form>)
    }
    
    return (
      <Dialog
        open={true}
        fullWidth={true}
        maxWidth={'md'}
      >
        <div className={classes.SurveyForm}>
          <div className={classes.Header}>
            <p style={{fontSize: '27px', margin: 'auto 0', fontWeight: '500'}}>Survey Detail</p>
            <IconButton className={classes.CloseButton} onClick={this.handleClose}><Close color="primary" /></IconButton>
          </div>
          <div className={classes.Content}>
            {surveyForm}
          </div>
        </div>
      </Dialog>
    );
  }
}

export default SurveyForm;