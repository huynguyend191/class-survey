import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ToolBar from '../../../components/ToolBar/ToolBar';
import classes from './ManageSurveys.module.css';
import { manageSurveyToolbar } from '../../../utils/navigations';
import SurveyList from '../SurveyList/SurveyList';
import SurveyForm from '../SurveyForm/SurveyForm';
import SurveyCreate from '../SurveyCreate/SurveyCreate';
import UploadFileArea from '../UploadFileArea/UploadFileArea';

class ManageSurveys extends Component {
  render() {
    return (
      <div className={classes.ManageSurveys}>
        <ToolBar navigations={manageSurveyToolbar} />
        <Switch>
          <Route path='/surveys/generate' component={SurveyForm}/>  
          <Route path='/surveys/create' component={SurveyCreate} /> 
          <Route path='/surveys/upload' component={UploadFileArea} />    
          <Route path='/surveys' exact component={SurveyList}/>                    
        </Switch>
      </div>
    );
  }
}

export default ManageSurveys;