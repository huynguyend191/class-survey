import React, { Component } from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import classes from './DataTable.module.css';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';

class DataTable extends Component {
  state = {
    openConfirmDelete: false,
    deleteId: null
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

  render() {
    //tableBody loading or show data
    let tableBody = (
      // +2 because of No. and Buttons cell
      <TableRow className={classes.TableBodyRow}>
        <TableCell colSpan={this.props.tableHeadInfo.length + 2} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
      </TableRow>
    );
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
                  <IconButton className={classes.EditButton} onClick={() => this.props.handleEditAccount(account.id)}>
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
                  <IconButton className={classes.AddButton} onClick={this.props.addAccount}>
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