import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './SurveyVersion.module.css';
import { fetchSurveyVer } from '../../../store/actions';
import { createSurveyVer, deleteSurveyVer } from '../../../store/actions/';
import RefreshIcon from '@material-ui/icons/Refresh';
import GenerateSurveyVer from '@material-ui/icons/PlaylistAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import ShowIcon from '@material-ui/icons/Visibility';
import {Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Tooltip, IconButton } from '@material-ui/core';
import ConfirmDelete from '../../../components/ConfirmDelete/ConfirmDelete';
import uuidv4 from 'uuid';
import moment from 'moment';
import { surveyForm } from '../../../utils/defaultSurveyForm';

class SurveyVersion extends Component {
  state = {
    showDeleteModal: false,
    deleteId: null
  }

  componentDidMount() {
    if(!this.props.surveyVersions.length > 0) {
      this.props.onFetchSurveyVer();
    }
  }

  handleGenerateDefault = () => {
    this.props.onCreateNew(surveyForm)
  }

  showVersionContent = (contentObject) => {
    console.log(contentObject)
  }

  handleRefresh = () => {
    this.props.onFetchSurveyVer();
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

  render() {
    let tableBody = (
      <TableRow>
        <TableCell colSpan={5} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
      </TableRow>
    );
    if (!this.props.loading) {
      if (this.props.surveyVersions.length > 0) {
        const surveyVer =  this.props.surveyVersions;
        const formatSurveyVer = [];
        let createdDate = 'N/A';
        let modifiedDate = 'N/A';
        for (let index in surveyVer) {
          if (surveyVer[index].CreatedDate) {
            createdDate =  moment(surveyVer[index].CreatedDate).format('lll')
          }
          if (surveyVer[index].ModifiedDate) {
            modifiedDate = moment(surveyVer[index].ModifiedDate).format('lll')
          }
          formatSurveyVer.push({
            Id: surveyVer[index].Id,
            Version: surveyVer[index].Version,
            CreatedDate: createdDate,
            ModifiedDate: modifiedDate
          })
        }
        tableBody = formatSurveyVer.map((surveyVer, index) => {
          const surveyVerObj = surveyVer;
          return(
            <TableRow key={surveyVer.Id} className={classes.TableBodyRow}>
              <TableCell>{index + 1}</TableCell>
              { 
                Object.keys(surveyVerObj).map(key => {
                  return key !== 'Id' ?  <TableCell key={uuidv4()}>{surveyVerObj[key]}</TableCell> : null;
                })
              }
               <TableCell style={{textAlign: "center"}}>

                  <IconButton className={classes.ShowButton} onClick={() => this.showVersionContent(this.props.surveyVersions[index].ContentCategory)} >
                    <ShowIcon fontSize="small" />
                  </IconButton>
                    <IconButton className={classes.DeleteButton} onClick={() => this.openDeleteConfirm(surveyVer.Id)} >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
              </TableCell>
              
            </TableRow>

          )
        })
      } else {
        tableBody = (
          <TableRow className={classes.TableBodyRow}>
            <TableCell colSpan={5} style={{textAlign: 'center'}}>No data</TableCell>
          </TableRow>
        )
      }
    }
    console.log(this.props.surveyVersions)
    return (
      <div className={classes.SurveyVersion}>
        <ConfirmDelete 
          isOpen={this.state.showDeleteModal}
          handleClose={this.closeDeleteConfirm}
          confirmDelete={this.props.onDeleteSurveyVer}
          deleteId={this.state.deleteId}
          msg="survey version"
        />
        <Table className={classes.SurveyVerTable}>
          <TableHead>
            <TableRow className={classes.TableHeadRow}>
              <TableCell className={classes.Cell}>#</TableCell>
              <TableCell className={classes.Cell}>Version</TableCell>
              <TableCell className={classes.Cell}>Created Date</TableCell>
              <TableCell className={classes.Cell}>Modified Date</TableCell>
              <TableCell style={{textAlign: "center"}}>
                <Tooltip title="Refresh" disableFocusListener>
                  <IconButton className={classes.RefreshButton} onClick={this.handleRefresh}>
                    <RefreshIcon fontSize="small"/>
                  </IconButton>
                </Tooltip>   
                <Tooltip title="Generate Default" disableFocusListener>
                  <IconButton className={classes.GenerateDefaultBtn} onClick={this.handleGenerateDefault}>
                    <GenerateSurveyVer fontSize="small" color="primary"/>
                  </IconButton>
                </Tooltip>    
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBody}
          </TableBody>
        </Table>
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
    onCreateNew: (form) => dispatch(createSurveyVer(form)),
    onDeleteSurveyVer: (id) => dispatch(deleteSurveyVer(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyVersion);