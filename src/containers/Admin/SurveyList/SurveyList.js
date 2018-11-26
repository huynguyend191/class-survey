import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, CircularProgress, Tooltip, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import classes from './SurveyList.module.css';
import { fetchSurveys } from '../../../store/actions';
import { updateSurveyPage } from '../../../store/actions/actionCreator/surveys';
import uuidv4 from 'uuid';
import SearchSurvey from '../SearchBar/SearchSurvey';

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
        <TableCell colSpan={7} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
      </TableRow>
    );

    if (!this.props.loading) {
      if (this.props.surveys.length > 0) {
        const rowsPerPage = this.state.rowsPerPage;
        const surveys = this.props.surveys.slice(this.props.page * rowsPerPage, this.props.page * rowsPerPage + rowsPerPage);
        const formatSurveys = [];
        for(let index in surveys) {
          formatSurveys.push({
            Id: surveys[index].Id,
            ClassCode: surveys[index].ClassCode,
            Subject: surveys[index].Subject,
            Students: surveys[index].StudentNumber,
            openedDate: surveys[index].openedDate,
            closedDate: surveys[index].closedDate,
          })
        }
        tableBody = formatSurveys.map((survey, index) => {
          const surveyObject = survey;
          return(
            <TableRow key={survey.Id} className={classes.TableBodyRow}>
              <TableCell>{(index + 1) + this.props.page * rowsPerPage}</TableCell>
              { 
                Object.keys(surveyObject).map(key => {
                  return key !== 'Id' ?  <TableCell key={uuidv4()}>{surveyObject[key]}</TableCell> : null;
                })
              }
              <TableCell>Delete</TableCell>
            </TableRow>
          )
        })
      } else {
        tableBody = (
          <TableRow className={classes.TableBodyRow}>
            <TableCell colSpan={7} style={{textAlign: 'center'}}>No survey</TableCell>
          </TableRow>
        )
      }
    }


    return (
      <div className={classes.SurveyList}>
        <SearchSurvey />
        <Table>
          <TableHead>
            <TableRow className={classes.TableHeadRow}>
              <TableCell className={classes.Cell}>STT</TableCell>
              <TableCell className={classes.Cell}>Mã môn học</TableCell>
              <TableCell className={classes.Cell}>Tên môn học</TableCell>
              <TableCell className={classes.Cell}>Sinh viên</TableCell>
              <TableCell className={classes.Cell}>Thời gian mở</TableCell>
              <TableCell className={classes.Cell}>Thời gian đóng</TableCell>
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