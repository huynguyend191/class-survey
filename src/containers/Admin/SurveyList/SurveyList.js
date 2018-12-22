import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, CircularProgress, Tooltip, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import ShowIcon from '@material-ui/icons/Visibility';
import DisableShowIcon from '@material-ui/icons/VisibilityOff';
import classes from './SurveyList.module.css';
import { fetchSurveys, removeSurveyError, deleteSurvey, searchSurveys } from '../../../store/actions';
import uuidv4 from 'uuid';
import SearchSurvey from '../SearchBar/SearchSurvey';
import ConfirmDelete from '../../../components/ConfirmDelete/ConfirmDelete';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';
import moment from 'moment'
import EditSurveyModal from '../EditSurveyModal/EditSurveyModal';

class SurveyList extends Component {

  state = {
    rowsPerPage: 10,
    page: 0,
    showDeleteModal: false,
    showEditModal: false,
    showResultModal: false,
    deleteId: null,
    selectedSurvey: null
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
    this.setState({page: page});
  }

  openDeleteConfirm = (id) => {
    this.setState({
      showDeleteModal: true,
      deleteId: id
    });
  }

  closeDeleteConfirm = () => {
    this.setState({
      showDeleteModal: false,
      deleteId: null
    });
  }

  addClass = () => {
    this.props.history.push('/surveys/upload');
  }


  openEditModal = (survey) => {
    this.props.history.push('surveys/edit/' + survey.Id)
    this.setState({selectedSurvey: survey})
  }

  showSurveyResult = (id) => {
    console.log(id)
  }

  hideSurveyResult = () => {

  }

  
  render() {
    // console.log(this.props.surveys)
    let tableBody = (
      <TableRow>
        <TableCell colSpan={7} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
      </TableRow>
    );

    if (!this.props.loading) {
      if (this.props.surveys.length > 0) {
        const rowsPerPage = this.state.rowsPerPage;
        const surveys = this.props.surveys.slice(this.state.page * rowsPerPage, this.state.page * rowsPerPage + rowsPerPage);
        const formatSurveys = [];
     
        for(let index in surveys) {
          formatSurveys.push({
            Id: surveys[index].Id,
            ClassCode: surveys[index].ClassCode,
            Subject: surveys[index].Subject,
            Students: surveys[index].StudentNumber,
            OpenedDate: surveys[index].OpenedDate ? moment(surveys[index].OpenedDate).format('lll') : 'N/A',
            ClosedDate: surveys[index].ClosedDate ? moment(surveys[index].ClosedDate).format('lll') : 'N/A',
            surveyResult: surveys[index].M
          })
          
        }
        tableBody = formatSurveys.map((survey, index) => {
          const surveyObject = survey;
          let resultBtn = (
            <Tooltip title="Survey Result Unavailable">
              <IconButton className={classes.ShowButton} >
                <DisableShowIcon fontSize="small" />
              </IconButton> 
            </Tooltip>
          )
          if(survey.surveyResult) {
            resultBtn = (
              <Tooltip title="View Result">
                <IconButton className={classes.ShowButton} onClick={() => this.showSurveyResult(survey.Id)} >
                  <ShowIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )
          }
          return(
            <TableRow key={survey.Id} className={classes.TableBodyRow}>
              <TableCell>{(index + 1) + this.state.page * rowsPerPage}</TableCell>
              { 
                Object.keys(surveyObject).map(key => {
                  return (key !== 'Id' && key !== 'surveyResult') ?  <TableCell key={uuidv4()}>{surveyObject[key]}</TableCell> : null;
                })
              }
              <TableCell style={{textAlign: "center"}}>
                {resultBtn}
                <IconButton className={classes.EditButton}
                  onClick={() => this.openEditModal(this.props.surveys[index])}
                >
                  <EditIcon fontSize="small" color="primary" />
                </IconButton>
                <IconButton className={classes.DeleteButton} onClick={() => this.openDeleteConfirm(survey.Id)} >
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </TableCell>
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
        <ErrorModal 
          isOpen={this.props.error ? true : false}
          error={this.props.error}
          handleCloseModal={this.props.handleCloseError}
        />
        <ConfirmDelete 
          isOpen={this.state.showDeleteModal}
          handleClose={this.closeDeleteConfirm}
          confirmDelete={this.props.handleDeleteSurvey}
          deleteId={this.state.deleteId}
          msg="class"
        />
        <SearchSurvey 
          searchSurveys={this.props.onSearchSurvey}
        />
        <Route  
          path={this.props.match.path + '/edit/:id'}
          render={() =>
            <EditSurveyModal
              history={this.props.history} 
              returnPath={this.props.match.path}
              version={this.state.selectedVersion}
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
              <TableCell className={classes.Cell}>Open Date</TableCell>
              <TableCell className={classes.Cell}>Close Date</TableCell>
              <TableCell style={{textAlign: "center"}}>
                <Tooltip title="Refresh" disableFocusListener>
                  <IconButton className={classes.RefreshButton} onClick={this.handleRefresh}>
                    <RefreshIcon fontSize="small"/>
                  </IconButton>
                </Tooltip>    
                <Tooltip title="Add class" disableFocusListener>
                  <IconButton className={classes.AddButton} onClick={this.addClass}>
                    <AddIcon fontSize="small" />
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
    loading: state.surveyReducer.loadingSurvey,
    error: state.surveyReducer.error,
    surveys: state.surveyReducer.surveys,
    total: state.surveyReducer.totalSurveys,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchSurvey: () => dispatch(fetchSurveys()),
    handleDeleteSurvey: (id) => dispatch(deleteSurvey(id)),
    handleCloseError: () => dispatch(removeSurveyError()),
    onSearchSurvey: (keyword, type) => dispatch(searchSurveys(keyword, type))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);