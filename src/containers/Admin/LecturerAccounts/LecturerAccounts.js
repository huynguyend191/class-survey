import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLecturerAccounts } from '../../../store/actions';
import DataTable from '../../../components/DataTable/DataTable';
import { tableHeadLecturer } from '../../../utils/tableInfo';

class LecturerAccounts extends Component {

  handleDeleteAccount = (username) => {
    alert(username);
  }

  handleChangePage = (event, page) => {
    this.props.onFetchAcc(page);
  }

  handleRefresh = () => {
    this.props.onFetchAcc(0);
  }

  componentDidMount() {
    if(this.props.accounts.length <= 0) {
      this.props.onFetchAcc(this.props.page);
    }
  }
  render() {
    return(
      <DataTable 
        accounts={this.props.accounts}
        page={this.props.page}
        isLoading={this.props.isLoading}
        handleChangePage={this.handleChangePage}
        handleDeleteAccount={this.handleDeleteAccount}
        handleRefresh={this.handleRefresh}
        totalAcc={this.props.totalAcc}
        tableHeadInfo={tableHeadLecturer}
      />
    )
  }
}
const mapStateToProps = state => {
  return {
    isLoading: state.accReducer.loading,
    error:  state.accReducer.error,
    accounts: state.accReducer.lecturerAccounts,
    totalAcc: state.accReducer.totalLecturers,
    page: state.accReducer.currentPageLecturer
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAcc: (page) => dispatch(fetchLecturerAccounts(page)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LecturerAccounts);