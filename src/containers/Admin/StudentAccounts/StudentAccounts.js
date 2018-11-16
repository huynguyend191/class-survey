import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudentAccounts, editStudent, deleteStudent, removeAccError, addStudent, searchStudent } from '../../../store/actions';
import DataTable from '../../DataTable/DataTable';
import { tableHeadStudent } from '../../../utils/accountInfo';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';
import { studentAcc } from '../../../utils/accountInfo';

class StudentAccounts extends Component {

  handleDeleteAccount = (id) => {
    this.props.onDeleteAcc(id);
  }

  handleEditAccount = (id, form) => {
    this.props.onEditAcc(id, form);    
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

  handleAddAcc = (form) => {
    this.props.onAddAcc(form);
  }

  handleSearchAcc = (keyword, type) => {
    this.props.onSearchAcc(keyword, type);
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
          accType = "student"
          accFormat = {studentAcc}
          history={this.props.history}
          path={this.props.match.path}
          accounts={this.props.accounts}
          page={this.props.page}
          isLoading={this.props.isLoading}

          handleChangePage={this.handleChangePage}
          handleEditAccount={this.handleEditAccount}
          handleDeleteAccount={this.handleDeleteAccount}
          handleRefresh={this.handleRefresh}
          handleAddAccount={this.handleAddAcc}
          handleSearchAcc={this.handleSearchAcc}

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
    onEditAcc: (id, form) => dispatch(editStudent(id, form)),
    onDeleteAcc: (id) => dispatch(deleteStudent(id)),
    onCloseError: () => dispatch(removeAccError()),
    onAddAcc: (form) => dispatch(addStudent(form)),
    onSearchAcc: (keyword, type) => dispatch(searchStudent(keyword, type))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentAccounts);