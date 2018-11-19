import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, CircularProgress, IconButton, Tooltip} from '@material-ui/core';
import classes from './SurveyList.module.css';
import { fetchSurveys } from '../../../store/actions';

class SurveyList extends Component {

  componentDidMount() {
    if (this.props.surveys.length <= 0) {
      this.props.onFetchSurvey(0);
    }
  }

  handleChangePage = (event, page) => {

  }

  render() {
    let tableBody = (
      <TableRow>
        <TableCell colSpan={4} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
      </TableRow>
    );

    if (!this.props.loading) {
      if (this.props.surveys.length > 0) {
        tableBody = this.props.surveys.map(survey => {
          const surveyObject = survey;
          return(
            <TableRow key={survey.id}>
              { 
                Object.keys(surveyObject).map(key => {
                  return key !== 'id' ?  <TableCell key={surveyObject[key]}>{surveyObject[key]}</TableCell> : null;
                })
              }
              <TableCell>Delete</TableCell>
            </TableRow>
          )
        })
      } else {
        tableBody = (
          <TableRow>
            <TableCell colSpan={4} style={{textAlign: 'center'}}>No survey</TableCell>
          </TableRow>
        )
      }
    }


    return (
      <div className={classes.SurveyList}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Modified At</TableCell>
              <TableCell>Refresh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBody}
          </TableBody>
        </Table>
        <TablePagination 
            component="div"
            count={this.props.total}  
            rowsPerPageOptions={[]}
            rowsPerPage={10}
            page={this.props.page} 
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
          />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.surveyReducer.loading,
    error: state.surveyReducer.error,
    surveys: state.surveyReducer.surveys,
    total: state.surveyReducer.totalSurveys,
    page: state.surveyReducer.currentPage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchSurvey: (page) => dispatch(fetchSurveys(page))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);