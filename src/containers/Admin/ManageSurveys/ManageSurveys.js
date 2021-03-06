import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ToolBar from '../../../components/ToolBar/ToolBar';
import classes from './ManageSurveys.module.css';
import { manageSurveyToolbar } from '../../../utils/navigations';
import SurveyList from '../SurveyList/SurveyList';
import SurveyVersion from '../SurveyVersion/SurveyVersion';
import UploadFileArea from '../UploadFileArea/UploadFileArea';
import { fetchSurveys } from '../../../store/actions';

class ManageSurveys extends Component {
  render() {
    return (
      <div className={classes.ManageSurveys}>
        <ToolBar navigations={manageSurveyToolbar} />
        <Switch>
          <Route path='/surveys/version' component={SurveyVersion}/>  
          <Route path='/surveys/upload' render={() => <UploadFileArea url="/api/Classes/Upload" refresh={this.props.onRefresh} />} />    
          <Route path='/surveys' component={SurveyList}/>      
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRefresh: () => dispatch(fetchSurveys())
  }
}

export default connect(null, mapDispatchToProps)(ManageSurveys);