import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, CircularProgress, Tooltip, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import classes from './SurveyList.module.css';
import { fetchSurveys } from '../../../store/actions';
import { updateSurveyPage } from '../../../store/actions/actionCreator/surveys';

class SurveyList extends Component {

  state = {
    rowsPerPage: 10,
  }

  componentDidMount() {
    if (this.props.surveys.length <= 0) {
      this.props.onFetchSurvey();
    }
  }

  handleRefresh = () => {
    this.props.onFetchSurvey();
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  }

  handleChangePage = (event, page) => {
    this.props.onChangePage(page);
  }

  render() {
    let tableBody = (
      <TableRow>
        <TableCell colSpan={6} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
      </TableRow>
    );

    // if (!this.props.loading) {
    //   if (this.props.surveys.length > 0) {
    //     tableBody = this.props.surveys.map(survey => {
    //       const surveyObject = survey;
    //       return(
    //         <TableRow key={survey.id}>
    //           { 
    //             Object.keys(surveyObject).map(key => {
    //               return key !== 'id' ?  <TableCell key={surveyObject[key]}>{surveyObject[key]}</TableCell> : null;
    //             })
    //           }
    //           <TableCell>Delete</TableCell>
    //         </TableRow>
    //       )
    //     })
    //   } else {
    //     tableBody = (
    //       <TableRow>
    //         <TableCell colSpan={6} style={{textAlign: 'center'}}>No survey</TableCell>
    //       </TableRow>
    //     )
    //   }
    // }


    return (
      <div className={classes.SurveyList}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class Code</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Open Time</TableCell>
              <TableCell>Close Time</TableCell>
              <TableCell>
                <Tooltip title="Refresh" disableFocusListener>
                  <IconButton className={classes.RefreshButton} onClick={this.handleRefresh}>
                    <RefreshIcon fontSize="small"/>
                  </IconButton>
                </Tooltip>    
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBody}
          </TableBody>
        </Table>
        <TablePagination 
            component="div"
            count={this.props.total}  
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={this.state.rowsPerPage}
            page={this.props.page} 
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
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
    onFetchSurvey: () => dispatch(fetchSurveys()),
    onChangePage: (page) => dispatch(updateSurveyPage(page))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);