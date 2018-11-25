import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLecturerAccounts, editLecturer, deleteLecturer, removeAccError, addLecturer, searchLecturer, updateLecturerPage } from '../../../store/actions';
import AccTable from '../AccTable/AccTable';
import { tableHeadLecturer } from '../../../utils/accountInfo';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';
import { lecAcc } from '../../../utils/accountInfo';


class LecturerAccounts extends Component {

  handleDeleteAccount = (id) => {
    this.props.onDeleteAcc(id);
  }

  handleEditAccount = (id, form) => {
    this.props.onEditAcc(id, form);    
  }

  handleChangePage = (event, page) => {
    this.props.onChangePage(page);
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

        <AccTable
          accType = "lecturer"
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
          tableHeadInfo={tableHeadLecturer}
          accountType="lecturer"
          accFormat={lecAcc}
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
    onCloseError: () => dispatch(removeAccError()),
    onAddAcc: (form) => dispatch(addLecturer(form)),
    onSearchAcc: (keyword, type) => dispatch(searchLecturer(keyword, type)),
    onChangePage: (page) => dispatch(updateLecturerPage(page))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LecturerAccounts);