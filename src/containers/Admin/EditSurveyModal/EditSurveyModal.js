import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Dialog, IconButton, CircularProgress, Button } from '@material-ui/core';
import Close from '@material-ui/icons/Cancel';
import classes from './EditSurveyModal.module.css';
import { fetchSurveyVer } from '../../../store/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class EditSurveyModal extends Component {

  componentDidMount() {
    if(!this.props.surveyVersions.length > 0) {
      this.props.onFetchSurveyVer();
    }
  }

  state = {
    openDate: {
      value: new Date(Date.now()), //default = now
      error: null
    },
    closeDate: {
      value: new Date(moment(Date.now()).add(7, 'days')), //default = now + 7
      error: null
    },
    classCode: {
      value: this.props.survey.ClassCode,
      error: null
    },
    surveyVersion: {
      value:  '',
      error: null
    },
    title: {
      value: this.props.survey.Subject,
      error: null
    },
    formIsValid: true
  }
  
  handleOpenDateChange = (date) => {
    this.setState({
      openDate: {
        value: date,
        error: null
      }
    })
    if ( date > this.state.closeDate.value) {
      let closeDate = this.state.closeDate
      this.setState({
        closeDate: {
          ...closeDate,
          error: 'Open Date is greater than Close Date'
        }
      })
    } else {
      let closeDate = this.state.closeDate
      this.setState({
        closeDate: {
          ...closeDate,
          error: null
        }
      })
    }
  }

  handleCloseDateChange = (date) => {
    this.setState({
      closeDate: {
        value: date,
        error: null
      }
    })

    if ( date < this.state.openDate.value) {
      this.setState({
        closeDate: {
          value: date,
          error: 'Open Date is greater than Close Date'
        }
      })
    }
  }

  handleSurveyVersionChange = (event) => {
    event.preventDefault();
    this.setState({
      surveyVersion: {
        value: event.target.value,
        error: null
      }
    })
   
  }


  handleClassCodeChange = (event) => {
    event.preventDefault();
    this.setState({
      classCode: {
        value: event.target.value
      }
    })
    if (event.target.value.trim() === '') {
      this.setState({
        classCode: {
          value: event.target.value,
          error: 'Class code cannot be emty'
        }
      })
    }
  }

  handleTitleChange = (event) => {
    event.preventDefault();
    this.setState({
      title: {
        value: event.target.value,
        error: null
      }
    })
    if (event.target.value.trim() === '') {
      this.setState({
        title: {
          value: event.target.value,
          error: 'Title cannot be emty'
        }
      })
    }
  }

  handleClose = () => (
    this.props.history.push(this.props.returnPath)
  )

  onSubmitForm = (event) => {
    event.preventDefault();
    let form = {
      ClassCode: this.state.classCode.value,
      Subject: this.state.title.value,
      OpenedDate: moment(this.state.openDate.value).format(),
      ClosedDate: moment(this.state.closeDate.value).format(),
      VersionSurveyId: this.state.surveyVersion.value === '' ? this.versionSurveySelection.value : this.state.surveyVersion.value
    }
    
    console.log(form)
  }

  render() {
    let formBody = <div style={{display: 'flex', justifyContent: 'center', marginTop:'120px'}}><CircularProgress size={70}/></div>
    if (!this.props.loading) {
      if (this.props.surveyVersions.length > 0) {
        const surveyVer =  this.props.surveyVersions;
        const formatSurveyVer = [];
        let createdDate = 'N/A';
        let modifiedDate = 'N/A';
        for (let index in surveyVer) {
          if (surveyVer[index].CreatedDate) {
            createdDate =  moment(surveyVer[index].CreatedDate).format('DD/MM/YYYY')
          }
          if (surveyVer[index].ModifiedDate) {
            modifiedDate = moment(surveyVer[index].ModifiedDate).format('DD/MM/YYYY')
          }
          formatSurveyVer.push({
            Id: surveyVer[index].Id,
            Version: surveyVer[index].Version,
            CreatedDate: createdDate,
            ModifiedDate: modifiedDate
          })
          createdDate = 'N/A';
          modifiedDate = 'N/A';
        }
   
        formBody = (  
          <form className={classes.EditSurveyForm} onSubmit={this.onSubmitForm}>

           <div className={classes.FormElement}>
              <div className={classes.InputHolder}>
                <p className={classes.InputTitle}>Open Date</p>
                <DatePicker className={classes.Input} 
                  minDate={new Date(Date.now())}
                  selected={this.state.openDate.value}
                  dateFormat="MMMM d, yyyy"
                  onChange={this.handleOpenDateChange}
                />
              </div>
              <div className={classes.ErrMsg}>{this.state.openDate.error}</div>
            </div>

            <div className={classes.FormElement}>
              <div className={classes.InputHolder}>
                <p className={classes.InputTitle}>Close Date</p>
                <DatePicker className={classes.Input} 
                  minDate={new Date(Date.now())}
                  selected={this.state.closeDate.value}
                  dateFormat="MMMM d, yyyy"
                  onChange={this.handleCloseDateChange}
                />
              </div>
              <div className={classes.ErrMsg}>{this.state.closeDate.error}</div>
            </div>

            <div className={classes.FormElement}>
              <div className={classes.InputHolder}>
                <p className={classes.InputTitle}>Survey Version</p>
                <select 
                  className={classes.Select} 
                  value={this.state.surveyVersion.value} 
                  onChange={this.handleSurveyVersionChange}
                  ref={(input) => this.versionSurveySelection = input}
                >
                  {
                    formatSurveyVer.map(surveyVer => {
                      return (
                        <option key={surveyVer.Id} value={surveyVer.Id}>
                          Ver{surveyVer.Version} - C:{surveyVer.CreatedDate} - M:{surveyVer.ModifiedDate} 
                        </option>
                      )
                    })
                  }
                </select>
              </div>
              <div className={classes.ErrMsg}>{this.state.surveyVersion.error}</div>
            </div>

            <div className={classes.FormElement}>
              <div className={classes.InputHolder}>
                <p className={classes.InputTitle}>Class Code</p>
                <input className={classes.Input} value={this.state.classCode.value} onChange={this.handleClassCodeChange} />
              </div>
              <div className={classes.ErrMsg}>{this.state.classCode.error}</div>
            </div>

            <div className={classes.FormElement}>
              <div className={classes.InputHolder}>
                <p className={classes.InputTitle}>Title</p>
                <input className={classes.Input} value={this.state.title.value} onChange={this.handleTitleChange} />
              </div>
              <div className={classes.ErrMsg}>{this.state.title.error}</div>
            </div>
            
            <div className={classes.ButtonHolder}>
              <Button 
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!this.state.formIsValid}
              >Submit</Button>
            </div>
           
          </form>
        )
      } else {
        formBody = (
          <div className={classes.EmtyVersionMsg}>
            No suvey version available! <br />
            Please create one before editing this survey!
          </div>)
      }
    }
    return (
      <Dialog
        open={true}
      > 
        <div className={classes.EditSurveyModal}>
          <div className={classes.Header}>
            <p style={{fontSize: '27px', margin: 'auto 0', fontWeight: '500'}}>Edit Survey</p>
            <IconButton className={classes.CloseButton} onClick={this.handleClose}><Close color="primary" /></IconButton>
          </div>
          <div className={classes.FormBody}>
            {formBody}
          </div>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    surveyVersions: state.surveyReducer.surveyVersions,
    loading: state.surveyReducer.loadingVersion,
  }
};

const mapDispatchToProps =  dispatch => {
  return {
    onFetchSurveyVer: () => dispatch(fetchSurveyVer()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSurveyModal);