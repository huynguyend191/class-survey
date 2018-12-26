import React, { Component } from 'react';
import { Dialog, IconButton, RadioGroup, Radio, Button, CircularProgress } from '@material-ui/core';
import Close from '@material-ui/icons/Cancel';
import classes from './SurveyForm.module.css';
import  { invertObjectServerToClient } from '../../../utils/invertObject';
import axios from '../../../utils/axiosConfig';
import UploadedModal from '../../../components/UploadedModal/UploadedModal';

class SurveyForm extends Component {
  state = {
    surveyContent: null, //form
    formIsValid: false,
    formId: null,
    newForm: false, //check if update or post
    loading: false,
    error: null,
    invalidMsg: false, //form check
    succesfulModal: false
  }
  componentDidMount() {
    //check if form exist
    this.setState({loading: true});
    axios.get('/api/Forms/List?StudentClassId=' + this.props.surveyInfo.studentClassId, {data: {}})
    .then(result => {
      if(result.data.length > 0) {
        this.setState({
          surveyContent :result.data[0].ContentValues,
          formIsValid: true,
          formId: result.data[0].Id
        })
      } else {
        let surveyContent = {};
        //create state for form
        const category = Object.keys(this.props.surveyInfo.content);
        for (let index in category) {
          surveyContent = {...surveyContent, ...{[category[index]] : '0'}}
        }
        this.setState({
          surveyContent: surveyContent,
          newForm: true
        })
      }
      this.setState({loading: false});
    })
    .catch(error => {
      this.setState({loading: false, error: 'Get survey failed, please try again'});
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
    this.setState({loading: true});
    if (this.state.newForm) {
      axios.post('/api/Forms', {
        StudentClassId: this.props.surveyInfo.studentClassId,
        Content: JSON.stringify(this.state.surveyContent)
      })
      .then(result => {
        this.setState({loading: false, succesfulModal: true});
      })
      .catch(error => {
        this.setState({loading: false, error: 'Submit form failed, please try again'});
      })
    } else {
      axios.put('/api/Forms/' + this.state.formId, {
        StudentClassId: this.props.surveyInfo.studentClassId,
        Content: JSON.stringify(this.state.surveyContent)
      })
      .then(result => {
        this.setState({loading: false, succesfulModal: true});
      })
      .catch(error => {
        this.setState({loading: false, error: 'Submit form failed, please try again'});
      })
    }
   
  }

  checkFormValidation = (form) => {
    // if 0 doesn't exist, valid
    const isValid = Object.values(form).indexOf('0') < 0
    if (isValid) {
      this.setState({invalidMsg: null})
    }else {
      this.setState({invalidMsg: 'Please complete the form before submit'})
    }
    this.setState({formIsValid: isValid});
  }

  render() {
    let surveyForm =  <div style={{display: 'flex', justifyContent: 'center', marginTop:'100px'}}><CircularProgress size={70}/></div>
    if (!this.state.loading) {
      if (this.state.error) {
        //error handler
        surveyForm = <div className={classes.ErrorMsg}>{this.state.error}</div>
      }
      else if (this.state.surveyContent) {
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
            <div className={classes.InvalidForm}>{this.state.invalidMsg}</div> 
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
    }
    
    
    return (
      <Dialog
        open={true}
        fullWidth={true}
        maxWidth={'md'}
      >
        <UploadedModal isOpen={this.state.succesfulModal} handleCloseModal={this.handleClose} />
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