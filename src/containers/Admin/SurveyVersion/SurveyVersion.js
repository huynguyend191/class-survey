import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './SurveyVersion.module.css';
import { fetchSurveyVer } from '../../../store/actions';
import { createSurvey } from '../../../store/actions/actionCreator/surveys';


class SurveyVersion extends Component {

  componentDidMount() {
    // this.props.onCreateNew();
    if(!this.props.surveyVersions.length > 0) {
      this.props.onFetchSurveyVer()
    }
  }

  render() {
    return (
      <div className={classes.SurveyVersion}>
        Manage Version here
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    surveyVersions: state.surveyReducer.surveyVersions,
    loading: state.surveyReducer.loadingVersion,
    error: state.surveyReducer.errorVersion
  }
} 

const mapDispatchToProps = dispatch => {
  return {
    onFetchSurveyVer: () => dispatch(fetchSurveyVer()),
    onCreateNew: () => dispatch(createSurvey())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyVersion);