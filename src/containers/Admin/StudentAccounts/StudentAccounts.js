import React, { Component } from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import classes from './StudentAccounts.module.css';
import { fetchStudentAccounts } from '../../../store/actions';

class StudentAccounts extends Component {
  state = {
    rowsPerPage: 10 
  }

  handleDeleteAccount = (username) => {
    alert(username);
  }

  handleChangePage = (event, page) => {
    this.props.onFetchAcc(page);
  }

  componentDidMount() {
    if(this.props.accounts.length <= 0) {
      this.props.onFetchAcc(0);
    }
  }
  render() {

    let tableBody = (
      <TableRow className={classes.StudentTableBodyRow}>
        <TableCell colSpan={6} style={{textAlign: 'center'}}><CircularProgress size={30} /></TableCell>
      </TableRow>
    );
    if (!this.props.isLoading) {
      tableBody = this.props.accounts.map((account,index) => {
        return(
          <TableRow className={classes.StudentTableBodyRow} key={account.username}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{account.username}</TableCell>
            <TableCell>{account.fullname}</TableCell>
            <TableCell>{account.VNUemail}</TableCell>
            <TableCell>{account.year}</TableCell>
            <TableCell>
              <button onClick={() => this.handleDeleteAccount(account.username)}>Delete</button>
            </TableCell>
          </TableRow>
        )
      });
    }
    return (
      <div className={classes.StudentAccounts}>
        <Table>
          <TableHead>
            <TableRow className={classes.StudentTableHeadRow}>
              <TableCell className={classes.Cell}>STT</TableCell>
              <TableCell className={classes.Cell}>Tên đăng nhập</TableCell>
              <TableCell className={classes.Cell}>Họ và tên</TableCell>
              <TableCell className={classes.Cell}>VNU email</TableCell>
              <TableCell className={classes.Cell}>Khóa</TableCell>
              <TableCell className={classes.Cell}></TableCell>
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
          rowsPerPage={this.state.rowsPerPage}
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
    isLoading: state.accReducer.loading,
    error:  state.accReducer.error,
    accounts: state.accReducer.studentAccounts,
    totalAcc: state.accReducer.totalStudents,
    page: state.accReducer.currentPageStudent
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAcc: (page) => dispatch(fetchStudentAccounts(page))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentAccounts);