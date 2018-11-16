import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLecturerAccounts, editLecturer, deleteLecturer, removeAccError } from '../../../store/actions';
import DataTable from '../../DataTable/DataTable';
import { tableHeadLecturer } from '../../../utils/accountInfo';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';

class LecturerAccounts extends Component {

  handleDeleteAccount = (id) => {
    this.props.onDeleteAcc(id);
  }

  handleEditAccount = (id, form) => {
    this.props.onEditAcc(id, form);    
  }

  handleChangePage = (event, page) => {
    this.props.onFetchAcc(page);
  }

  handleRefresh = () => {
    this.props.onFetchAcc(0);
  }

  handleCloseError = () => {
    this.props.onCloseError();
  }

  componentDidMount() {
    if(this.props.accounts.length <= 0) {
      this.props.onFetchAcc(this.props.page);
    }
  }
  render() {
    return(
      <div>
        <ErrorModal 
          isOpen={this.props.error ? true : false}
          error={this.props.error}
          handleCloseModal={this.handleCloseError}
        />
        <DataTable
          history={this.props.history}
          path={this.props.match.path}
          accounts={this.props.accounts}
          page={this.props.page}
          isLoading={this.props.isLoading}
          handleChangePage={this.handleChangePage}
          handleEditAccount={this.handleEditAccount}
          handleDeleteAccount={this.handleDeleteAccount}
          handleRefresh={this.handleRefresh}
          totalAcc={this.props.totalAcc}
          tableHeadInfo={tableHeadLecturer}
          accountType="lecturer"
        />
      </div>
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
    onEditAcc: (id, form) => dispatch(editLecturer(id, form)),
    onDeleteAcc: (id) => dispatch(deleteLecturer(id)),
    onCloseError: () => dispatch(removeAccError())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LecturerAccounts);