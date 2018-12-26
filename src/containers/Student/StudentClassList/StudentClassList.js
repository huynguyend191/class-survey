import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../utils/axiosConfig';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, CircularProgress, Tooltip, IconButton } from '@material-ui/core';
import { Route } from 'react-router-dom';
import RefreshIcon from '@material-ui/icons/Refresh';
import ShowIcon from '@material-ui/icons/Visibility';
import DisableShowIcon from '@material-ui/icons/VisibilityOff';
import moment from 'moment';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';
import SurveyForm from '../SurveyForm/SurveyForm';


import classes from './StudentClassList.module.css';

class StudentClassList extends Component {

  state = {
    classes: [],
    loading: false,
    error: null,
    
    selectedSurvey: null,

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

  handleCloseError = () => {
    this.setState({error: null})
  }

  handleViewSurvey = (Class) => {
    console.log(Class)
  }
  
  componentDidMount() {
    this.fetchStudentClasses();
  }

  fetchStudentClasses = () => {
    this.setState({loading: true})
    axios.get('/api/Students/Classes/' + this.props.studentId)
    .then(result => {
      this.setState({
        loading: false,
        classes: result.data
      })
    })
    .catch(error => {
      this.setState({
        loading: false,
        error: 'Fetch surveys failed'
      })
    })
  }
  

  render() {
    let tableBody = (
      <TableRow>
        <TableCell colSpan={6} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
      </TableRow>
    );
    if (!this.state.loading) {
      if (this.state.classes.length > 0) {
        const rowsPerPage = this.state.rowsPerPage;
        const classInfo = this.state.classes.slice(this.state.page * rowsPerPage, this.state.page * rowsPerPage + rowsPerPage);
        
        

        //render table info
        tableBody = classInfo.map((Class, index) => {
          let buttons = (
            <Tooltip title="Survey Unavailable">
                <IconButton className={classes.ShowButton} >
                  <DisableShowIcon fontSize="small" />
                </IconButton> 
            </Tooltip>
          )
  
          //check if survey is in available date and has content
          const today = new Date(Date.now());
          if(today <= new Date(Class.ClosedDate).setHours(0,0,0,0) && today >= new Date(Class.OpenedDate).setHours(0,0,0,0) && Class.VersionSurveyEntity) {
            buttons = (
              <Tooltip title="Show Survey">
                <IconButton className={classes.ShowButton} onClick={() => this.handleViewSurvey(Class)} >
                  <ShowIcon fontSize="small" color="primary"/>
                </IconButton>
              </Tooltip>
            )
          }
          return (
            <TableRow key={Class.Id} className={classes.TableBodyRow}>
              <TableCell>{(index + 1) + this.state.page * rowsPerPage}</TableCell>
              <TableCell>{Class.ClassCode} - {Class.Subject}</TableCell>
              <TableCell>{Class.Lecturer.Name}</TableCell>
              <TableCell>{Class.OpenedDate ? moment(Class.OpenedDate).format('DD/MM/YYYY') : 'N/A'}</TableCell>
              <TableCell>{Class.ClosedDate ? moment(Class.ClosedDate).format('DD/MM/YYYY') : 'N/A'}</TableCell>
              <TableCell style={{textAlign: "center"}}>
                {buttons}
              </TableCell>
            </TableRow> 
          )
        })
      }
      else{
        tableBody = (
          <TableRow className={classes.TableBodyRow}>
            <TableCell colSpan={6} style={{textAlign: 'center'}}>No survey</TableCell>
          </TableRow>
        )
      }
    }
    return (
      <div className={classes.StudentClassList}>
        <ErrorModal 
          isOpen={this.state.error ? true : false}
          error={this.state.error}
          handleCloseModal={this.handleCloseError}
        />
        <Table>
          <TableHead>
            <TableRow className={classes.TableHeadRow}>
              <TableCell className={classes.Cell}>#</TableCell>
              <TableCell className={classes.Cell}>Title</TableCell>
              <TableCell className={classes.Cell}>Lecturer</TableCell>
              <TableCell className={classes.Cell}>OpenDate</TableCell>
              <TableCell className={classes.Cell}>CloseDate</TableCell>
              <TableCell style={{textAlign: "center"}}>
                <Tooltip title="Refresh" disableFocusListener>
                  <IconButton className={classes.RefreshButton} onClick={this.fetchStudentClasses}>
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
          count={this.state.classes.length}  
          rowsPerPageOptions={[5, 10, 25]}
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
    studentId: state.authReducer.id
  }
}

export default connect(mapStateToProps)(StudentClassList);