import React, { Component } from 'react';
import { Dialog, IconButton, CircularProgress } from '@material-ui/core';
import Close from '@material-ui/icons/Cancel';
import axios from '../../../utils/axiosConfig';
import classes from './SurveyResult.module.css';
class SurveyResult extends Component {

  state = {
    survey: null,
    loading: false,
    error: null
  }

  componentDidMount() {
    this.setState({loading: true, error: null})
    axios.get('/api/Classes/' + this.props.id, {data: {}})
    .then(result => {
      this.setState({loading: false, survey: result.data})
    })
    .catch(error => {
      this.setState({loading: true, error: 'Get survey result failed!'})
    })
  }

  handleClose = () => {
    this.props.history.push(this.props.returnPath)
  }

  render() {
    let surveyResult = <div style={{display: 'flex', justifyContent: 'center', marginTop:'100px'}}><CircularProgress size={70}/></div>
    if(!this.state.loading) {
      if(this.state.survey) {
        const surveyInfo = this.state.survey;
        let tableBody = null;
        if (surveyInfo.M) {
          //check if exist
            tableBody = Object.keys(JSON.parse(surveyInfo.M)).map((key, index) => {
              //format and return N/A if null
              const M = surveyInfo.M ? Number(JSON.parse(surveyInfo.M)[key]).toFixed(2) : 'N/A';
              const M1 = surveyInfo.M1 ? Number(JSON.parse(surveyInfo.M1)[key]).toFixed(2) : 'N/A';
              const M2 = surveyInfo.M2 ? Number(JSON.parse(surveyInfo.M2)[key]).toFixed(2) : 'N/A';
              const STD = surveyInfo.Std ? Number(JSON.parse(surveyInfo.Std)[key]).toFixed(2) : 'N/A';
              const STD1 = surveyInfo.Std1 ? Number(JSON.parse(surveyInfo.Std1)[key]).toFixed(2) : 'N/A';
              const STD2 = surveyInfo.Std2 ? Number(JSON.parse(surveyInfo.Std2)[key]).toFixed(2) : 'N/A';

              return(
                <tr key={key}>
                  <td className={classes.ResultCellNumber}>{index+1}</td>
                  <td className={classes.ResultCell}>{key}</td>
                  <td className={classes.ResultCellNumber}>{M}</td>
                  <td className={classes.ResultCellNumber}>{M1}</td>
                  <td className={classes.ResultCellNumber}>{M2}</td>
                  <td className={classes.ResultCellNumber}>{STD}</td>
                  <td className={classes.ResultCellNumber}>{STD1}</td>
                  <td className={classes.ResultCellNumber}>{STD2}</td>
                </tr>
              )
            })
        }
        surveyResult = (
          <div>
            <p className={classes.ClassInfo}> 
              Class: {surveyInfo.ClassCode} - {surveyInfo.Subject} <br />
              Lecturer: {surveyInfo.Lecturer.Name} <br />
              Total students: {surveyInfo.StudentNumber}
            </p>
            <table className={classes.Table}>
              <thead>
                <tr>
                  <th className={classes.ResultTableHead}>#</th>
                  <th className={classes.ResultTableHead}>Catergory</th>
                  <th className={classes.ResultTableHeadNum}>M</th>
                  <th className={classes.ResultTableHeadNum}>M1</th>
                  <th className={classes.ResultTableHeadNum}>M2</th>
                  <th className={classes.ResultTableHeadNum}>Std</th>
                  <th className={classes.ResultTableHeadNum}>Std1</th>
                  <th className={classes.ResultTableHeadNum}>Std2</th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
              
            </table>  
          </div>
          
        )
      }
      else if(!this.state.error) {
        surveyResult = (
          <div className={classes.ErrMsg}>
            {this.state.error}
          </div>
        )
      }
    }
    
    return (
      <Dialog
        open={true}
        maxWidth="md"
      > 
        <div className={classes.SurveyResult}>
          <div className={classes.Header}>
            <p style={{fontSize: '27px', margin: 'auto 0', fontWeight: '500'}}>Survey Result</p>
            <IconButton className={classes.CloseButton} onClick={this.handleClose}><Close color="primary" /></IconButton>
          </div>
          <div className={classes.ResultTable}>
            {surveyResult}
          </div>
        </div>
      </Dialog>
    );
  }
}

export default SurveyResult;