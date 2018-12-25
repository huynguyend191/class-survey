import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, CircularProgress, Tooltip, IconButton } from '@material-ui/core';
import ShowIcon from '@material-ui/icons/Visibility';
import DisableShowIcon from '@material-ui/icons/VisibilityOff';
import RefreshIcon from '@material-ui/icons/Refresh';

import axios from '../../../utils/axiosConfig';
import SurveyResult from '../../Admin/SurveyResult/SurveyResult';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';
import uuidv4 from 'uuid';

import classes from './LecturerClassList.module.css';

class LecturerClassList extends Component {

  state = {
    surveys: [],
    loading: false,
    error: null,
    showResultModal: false,
    resultId: null,

    rowsPerPage: 10,
    page: 0,
    total: 0
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  }

  handleChangePage = (event, page) => {
    this.setState({page: page});
  }

  showSurveyResult = (id) => {
    this.props.history.push('surveys/result/' + id);
    this.setState({resultId: id})
  }

  handleRefresh = () => {
    this.setState({loading: true});
    axios.get('/api/Classes/List?LecturerId=' + this.props.lecId, {data:{}})
    .then(result => {
      this.setState({
        surveys: result.data,
        loading: false,
        total: result.data.length
      })
    })
    .catch(error => {
      this.setState({
        loading: false,
        error: 'Fetched Surveys Failed'
      })
    })
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleCloseError = () => {
    this.setState({error: null})
  }


  render() {
    let tableBody = (
      <TableRow>
        <TableCell colSpan={5} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
      </TableRow>
    );

    if (!this.state.loading) {
      if (this.state.surveys.length > 0) {
        const rowsPerPage = this.state.rowsPerPage;
        const surveys = this.state.surveys.slice(this.state.page * rowsPerPage, this.state.page * rowsPerPage + rowsPerPage);
        const formatSurveys = [];
     
        for(let index in surveys) {
          formatSurveys.push({
            Id: surveys[index].Id,
            ClassCode: surveys[index].ClassCode,
            Subject: surveys[index].Subject,
            Students: surveys[index].StudentNumber,
            
          })
          
        }
        tableBody = formatSurveys.map((survey, index) => {
          const surveyObject = survey;
          let resultBtn = (
            <Tooltip title="Survey Result Unavailable">
              <IconButton className={classes.ShowButton} >
                <DisableShowIcon fontSize="small" color="primary"/>
              </IconButton> 
            </Tooltip>
          )
          if(new Date(Date.now()) > new Date(this.state.surveys[index].ClosedDate)) {
            resultBtn = (
              <Tooltip title="View Result">
                <IconButton className={classes.ShowButton} onClick={() => this.showSurveyResult(survey.Id)} >
                  <ShowIcon fontSize="small" color="primary"/>
                </IconButton>
              </Tooltip>
            )
          }
          return(
            <TableRow key={survey.Id} className={classes.TableBodyRow}>
              <TableCell>{(index + 1) + this.state.page * rowsPerPage}</TableCell>
              { 
                Object.keys(surveyObject).map(key => {
                  return (key !== 'Id') ?  <TableCell key={uuidv4()}>{surveyObject[key]}</TableCell> : null;
                })
              }
              <TableCell style={{textAlign: "center"}}>
                {resultBtn}
              </TableCell>
            </TableRow> 
          )
        })
      } else {
        tableBody = (
          <TableRow className={classes.TableBodyRow}>
            <TableCell colSpan={5} style={{textAlign: 'center'}}>No survey</TableCell>
          </TableRow>
        )
      }
    }


    return (
      <div className={classes.LecturerClassList}>
        <ErrorModal 
          isOpen={this.state.error ? true : false}
          error={this.state.error}
          handleCloseModal={this.handleCloseError}
        />
         <Route  
          path={this.props.match.path + 'surveys/result/:id'}
          render={() =>
            <SurveyResult
              history={this.props.history} 
              returnPath={this.props.match.path}
              id={this.state.resultId}
            />
          }
        />
        <Table>
          <TableHead>
            <TableRow className={classes.TableHeadRow}>
              <TableCell className={classes.Cell}>#</TableCell>
              <TableCell className={classes.Cell}>Class Code</TableCell>
              <TableCell className={classes.Cell}>Title</TableCell>
              <TableCell className={classes.Cell}>Students</TableCell>
              <TableCell style={{textAlign: "center"}}>
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
            count={this.state.total}  
            rowsPerPageOptions={[1, 10, 25]}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page} 
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
    lecId: state.authReducer.id
  }
}

export default connect(mapStateToProps)(LecturerClassList);