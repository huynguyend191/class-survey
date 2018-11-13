import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, CircularProgress, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import classes from './DataTable.module.css';

function DataTable(props) {
  let tableBody = (
    <TableRow className={classes.TableBodyRow}>
      <TableCell colSpan={props.tableHeadInfo.length + 1} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
    </TableRow>
  );
  if (!props.isLoading) {
    if (props.accounts.length > 0) {
      tableBody = props.accounts.map((account,index) => {
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
              <IconButton className={classes.EditButton} onClick={() => props.handleEditAccount(account.id)}>
                <EditIcon fontSize="small" color="primary" />
              </IconButton>
              <IconButton className={classes.DeleteButton} onClick={() => props.handleDeleteAccount(account.id)}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        )
      });
    } else {
      tableBody = (
        <TableRow className={classes.TableBodyRow}>
          <TableCell colSpan={props.tableHeadInfo.length + 1} style={{textAlign: 'center'}}>Không có kết quả</TableCell>
        </TableRow>
      )
    }
    
  }
  return (
    <div className={classes.Accounts}>
      <Table>
        <TableHead>
          <TableRow className={classes.TableHeadRow}>
            {
              props.tableHeadInfo.map(item => {
                return(
                  <TableCell className={classes.Cell} key={item}>{item}</TableCell>
                );
              })
            }
            <TableCell>
              <IconButton className={classes.RefreshButton} onClick={props.handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {tableBody}
        </TableBody>
      </Table>
      <TablePagination 
        component="div"
        count={props.totalAcc}  
        rowsPerPageOptions={[]}
        rowsPerPage={10}
        page={props.page} 
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={props.handleChangePage}
      />
    </div>
  );
}

export default DataTable;