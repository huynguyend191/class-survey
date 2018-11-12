import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudentAccounts } from '../../../store/actions';
import DataTable from '../../../components/DataTable/DataTable';
import { tableHeadStudent } from '../../../utils/tableInfo';

class StudentAccounts extends Component {

  handleDeleteAccount = (username) => {
    alert(username);
  }

  handleEditAccount = (username) => {
    alert(username);
  }

  handleRefresh = () => {
    this.props.onFetchAcc(0);
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
    return (
      <DataTable 
        accounts={this.props.accounts}
        page={this.props.page}
        isLoading={this.props.isLoading}
        handleChangePage={this.handleChangePage}
        handleDeleteAccount={this.handleDeleteAccount}
        handleRefresh={this.handleRefresh}
        totalAcc={this.props.totalAcc}
        tableHeadInfo={tableHeadStudent}
      />
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