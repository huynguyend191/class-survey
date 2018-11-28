import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudentAccounts, editStudent, deleteStudent, removeAccError, addStudent, searchStudent } from '../../../store/actions';
import AccTable from '../AccTable/AccTable';
import { tableHeadStudent } from '../../../utils/accountInfo';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';
import { studentAcc } from '../../../utils/accountInfo';

class StudentAccounts extends Component {
  state= {
    studentAcc: []
  }

  handleDeleteAccount = (id) => {
    this.props.onDeleteAcc(id);
  }

  handleEditAccount = (id, form) => {
    this.props.onEditAcc(id, form);    
  }

  handleRefresh = () => {
    this.props.onFetchAcc();
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
      this.props.onFetchAcc();
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
        <AccTable
          accType = "student"
          accFormat = {studentAcc}
          history={this.props.history}
          path={this.props.match.path}
          accounts={this.props.accounts}
          isLoading={this.props.isLoading}

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
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAcc: (page) => dispatch(fetchStudentAccounts(page)),
    onEditAcc: (id, form) => dispatch(editStudent(id, form)),
    onDeleteAcc: (id) => dispatch(deleteStudent(id)),
    onCloseError: () => dispatch(removeAccError()),
    onAddAcc: (form) => dispatch(addStudent(form)),
    onSearchAcc: (keyword, type) => dispatch(searchStudent(keyword, type)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentAccounts);