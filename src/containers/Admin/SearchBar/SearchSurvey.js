import React, { Component } from 'react';
import classes from './SearchBar.module.css';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class SearchAccount extends Component {
  state = {
    searchType: 'ClassCode',
    searchKeyword: '',
    isValid: false
  }

  handleChange = (event) => {
    this.checkEmtyKeyword();
    this.setState({[event.target.id]: event.target.value});
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    this.props.searchSurveys(this.state.searchKeyword, this.state.searchType);
    this.setState({searchType: 'ClassCode', searchKeyword: '', isValid: false});
  }

  checkEmtyKeyword = () => {
    let isValid = true;
    if (this.state.searchKeyword.trim() === '') {
      isValid = false;
    }
    this.setState({isValid: isValid});
  }

  render() {
    return (
      <div className={classes.SearchBar}>
        <form onSubmit={this.onSubmit} className={classes.SearchForm}>
          <input 
            onSelect={this.checkEmtyKeyword}
            placeholder="Enter keyword here..."
            id="searchKeyword" 
            value={this.state.searchKeyword} 
            onChange={this.handleChange} 
            className={classes.Input}/>
          <select id="searchType" value={this.state.searchType} onChange={this.handleChange} className={classes.Select}>
            <option value="ClassCode">Class Code</option>
            <option value="Subject">Title</option>
          </select>
          <Button
            className={classes.SearchButton}
            variant="contained" 
            color="primary"
            disabled={!this.state.isValid}
            type="submit"
          > 
            <SearchIcon />
          </Button>
        </form>
      </div>
    );
  }
}

export default SearchAccount;