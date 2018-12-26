import React, { Component } from 'react';
import { Dialog, IconButton, RadioGroup, Radio } from '@material-ui/core';
import Close from '@material-ui/icons/Cancel';
import classes from './SurveyForm.module.css';
import  { invertObjectServerToClient } from '../../../utils/invertObject';

class SurveyForm extends Component {
  state = {
    surveyContent: null
  }
  componentDidMount() {
    let surveyContent = {};
    //create state for form
    const category = Object.keys(this.props.surveyInfo.content);
    for (let index in category) {
      surveyContent = {...surveyContent, ...{[category[index]] : '1'}}
    }
    this.setState({
      surveyContent: surveyContent
    })
  }

  handleClose = () => {
    this.props.history.push(this.props.returnPath);
  }
  render() {
    let surveyForm = null;
    if (this.state.surveyContent) {
      const formInfo = invertObjectServerToClient(this.props.surveyInfo.content);
      surveyForm = (
        <RadioGroup style={{ display: 'flex', flexDirection:'row' }}>
          <Radio value="1" style={{ width: 'auto' }} />
          <Radio value="2" style={{ width: 'auto' }} />
          <Radio value="3" style={{ width: 'auto' }} />
          <Radio value="4" style={{ width: 'auto' }} />
          <Radio value="5" style={{ width: 'auto' }} />
        </RadioGroup>
      )
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