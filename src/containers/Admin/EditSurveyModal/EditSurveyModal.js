import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        formBody = (
          <form>
            <div>
              <p></p>
              <input />
            </div>
            <div>
              <p></p>
              <input />
            </div>
            <div>
              <DatePicker />
            </div>
            <div>
              <DatePicker />
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