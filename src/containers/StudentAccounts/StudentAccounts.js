import React, { Component } from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow, TablePagination} from '@material-ui/core';

class AccountList extends Component {
  state = {
    accounts : [
      {
        username: 16021391,
        fullname: 'Nguyễn Đắc Huy',
        VNUemail: '16021391@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      },
      {
        username: 16021392,
        fullname: 'Nani hello aloha',
        VNUemail: '16021392@gmail.com',
        year: 'QH-2016-I/CQ-C-CLC'
      }
    ],
    page: 0, 
    rowsPerPage: 10 
  }

  handleDeleteAccount = (username) => {
    alert(username);
  }

  handleChangePage = (event, page) => {
    alert(page)
  }
  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>VNU email</TableCell>
              <TableCell>Khóa</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.accounts.map((account,index) => {
                return(
                  <TableRow>
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
              })
            }
          </TableBody>
        </Table>
        <TablePagination 
          component="div"
          count={this.state.accounts.length}  
          rowsPerPageOptions={[]}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page} 
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

export default AccountList;