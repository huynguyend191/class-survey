import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudentAccounts, editStudent, deleteStudent, removeAccError } from '../../../store/actions';
import DataTable from '../../../components/DataTable/DataTable';
import { tableHeadStudent } from '../../../utils/tableInfo';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';

class StudentAccounts extends Component {

  handleDeleteAccount = (id) => {
    this.props.onDeleteAcc(id);
    alert(id);
  }

  handleEditAccount = (id) => {
    this.props.onEditAcc(id);    
  }

  handleRefresh = () => {
    this.props.onFetchAcc(0);
  }

  handleChangePage = (event, page) => {
    this.props.onFetchAcc(page);
  }

  handleCloseError = () => {
    this.props.onCloseError();
  }

  componentDidMount() {
    if(this.props.accounts.length <= 0) {
      this.props.onFetchAcc(0);
    }
  }
  render() {
    return (
      <div>
        <ErrorModal 
          isOpen={this.props.error ? true : false}
          error={this.props.error}
          handleCloseModal={this.handleCloseError}
        />
        <DataTable 
          accounts={this.props.accounts}
          page={this.props.page}
          isLoading={this.props.isLoading}
          handleChangePage={this.handleChangePage}
          handleEditAccount={this.handleEditAccount}
          handleDeleteAccount={this.handleDeleteAccount}
          handleRefresh={this.handleRefresh}
          totalAcc={this.props.totalAcc}
          tableHeadInfo={tableHeadStudent}
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
    onFetchAcc: (page) => dispatch(fetchStudentAccounts(page)),
    onEditAcc: (id) => dispatch(editStudent(id)),
    onDeleteAcc: (id) => dispatch(deleteStudent(id)),
    onCloseError: () => dispatch(removeAccError())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentAccounts);