import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Dialog, IconButton, CircularProgress } from '@material-ui/core';
import Close from '@material-ui/icons/Cancel';
import classes from './EditSurveyModal.module.css';
import { fetchSurveyVer } from '../../../store/actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
class EditSurveyModal extends Component {
  
  
  componentDidMount() {
    if(!this.props.surveyVersions.length > 0) {
      this.props.onFetchSurveyVer();
    }
  }

  handleClose = () => (
    this.props.history.push(this.props.returnPath)
  )

  render() {
    let formBody = <div style={{display: 'flex', justifyContent: 'center', marginTop:'150px'}}><CircularProgress size={70}/></div>
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
          <form className={classes.EditSurveyForm}>

           <div className={classes.FormElement}>
              <div className={classes.InputHolder}>
                <p className={classes.InputTitle}>Open Date</p>
                <DatePicker className={classes.Input} />
              </div>
              <div className={classes.ErrMsg}>{null}</div>
            </div>

            <div className={classes.FormElement}>
              <div className={classes.InputHolder}>
                <p className={classes.InputTitle}>Close Date</p>
                <DatePicker className={classes.Input} />
              </div>
              <div className={classes.ErrMsg}>{null}</div>
            </div>

            <div className={classes.FormElement}>
              <div className={classes.InputHolder}>
                <p className={classes.InputTitle}>Survey Version</p>
                <select className={classes.Select}>
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
              <div className={classes.ErrMsg}>Haha</div>
            </div>

            <div className={classes.FormElement}>
              <div className={classes.InputHolder}>
                <p className={classes.InputTitle}>Class Code</p>
                <input className={classes.Input} />
              </div>
              <div className={classes.ErrMsg}>Haha</div>
            </div>

            <div className={classes.FormElement}>
              <div className={classes.InputHolder}>
                <p className={classes.InputTitle}>Title</p>
                <input className={classes.Input} />
              </div>
              <div className={classes.ErrMsg}>{null}</div>
            </div>

           
          </form>
        )
      } else {
        formBody = (
          <div className={classes.EmtyVersionMsg}>
            No suvey version available! <br />
            Please create before editing this survey!
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