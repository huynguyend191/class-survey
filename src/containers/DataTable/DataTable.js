import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import classes from './DataTable.module.css';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';
import EditModal from '../AccForm/EditModal';
import AddModal from '../AccForm/AddModal';

// import CreateSurvey from '../Admin/CreateSurvey/CreateSurvey';

class DataTable extends Component {

  state = {
    openConfirmDelete: false,
    deleteId: null,
    editAccount: null
  }

  closeDeleteConfirm = () => {
    this.setState({
      openConfirmDelete: false,
      deleteId: null
    });
  }

  openDeleteConfirm = (id) => {
    this.setState({
      openConfirmDelete: true,
      deleteId: id
    });
  }

  openEditModal = (account) => {
    this.setState({
      editAccount: account
    });
    this.props.history.replace(this.props.path + '/edit');
  }

  openAddModal = () => {
    this.props.history.replace(this.props.path + '/add');
  }

  render() {
    //tableBody loading or show data
    let tableBody = (
      // +2 because of No. and Buttons cell
      <TableRow className={classes.TableBodyRow}>
        <TableCell colSpan={this.props.tableHeadInfo.length + 2} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
      </TableRow>
    );
    //finish loading
    if (!this.props.isLoading) {
      if (this.props.accounts.length > 0) {
        tableBody = this.props.accounts.map((account,index) => {
          const accountObject = account;
          return(
            <TableRow className={classes.TableBodyRow} key={account.id}>
              <TableCell>{index + 1}</TableCell>
              { 
                Object.keys(accountObject).map(key => {
                  return key !== 'id' ?  <TableCell key={accountObject[key]}>{accountObject[key]}</TableCell> : null;
                })
              }
              <TableCell>
                  <IconButton className={classes.EditButton}
                    onClick={() => this.openEditModal(account)}
                  >
                    <EditIcon fontSize="small" color="primary" />
                  </IconButton>
  
                  <IconButton className={classes.DeleteButton} onClick={() => this.openDeleteConfirm(account.id)} >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
  
              </TableCell>
            </TableRow>
          )
        });
      } else {
        tableBody = (
          <TableRow className={classes.TableBodyRow}>
            <TableCell colSpan={this.props.tableHeadInfo.length + 2} style={{textAlign: 'center'}}>No result</TableCell>
          </TableRow>
        )
      }
    }

    return (
      <div className={classes.Accounts}>
        <Route  
          path={this.props.path + '/edit'}
          render={() =>
            <EditModal
              accType={this.props.accType}
              submit={this.props.handleEditAccount}
              account={this.state.editAccount} 
              history={this.props.history} 
              path={this.props.path}/>
          }
        />
        <Route  
          path={this.props.path + '/add'}
          render={() =>
            <AddModal
              accType={this.props.accType}
              submit={this.props.handleAddAccount}
              history={this.props.history} 
              path={this.props.path}/>
          }
        />
        <ConfirmDelete 
          isOpen={this.state.openConfirmDelete}
          handleClose={this.closeDeleteConfirm}
          confirmDelete={this.props.handleDeleteAccount}
          deleteId={this.state.deleteId}
        />
        <Table>
          <TableHead>
            <TableRow className={classes.TableHeadRow}>
              <TableCell className={classes.Cell}>No.</TableCell>
              {
                this.props.tableHeadInfo.map(item => {
                  return(
                    <TableCell className={classes.Cell} key={item}>{item}</TableCell>
                  );
                })
              }
              <TableCell>
                <Tooltip title="Refresh" disableFocusListener>
                  <IconButton className={classes.RefreshButton} onClick={this.props.handleRefresh}>
                    <RefreshIcon fontSize="small"/>
                  </IconButton>
                </Tooltip>              
                <Tooltip title="Add" disableFocusListener>
                  <IconButton className={classes.AddButton} onClick={this.openAddModal}>
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
          count={this.props.totalAcc}  
          rowsPerPageOptions={[]}
          rowsPerPage={10}
          page={this.props.page} 
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.props.handleChangePage}
        />
      </div>
    );
  }
  
}

export default DataTable;