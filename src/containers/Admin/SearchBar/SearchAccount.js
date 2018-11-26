import React, { Component } from 'react';
import classes from './SearchBar.module.css';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class SearchAccount extends Component {
  state = {
    searchType: 'username',
    searchKeyword: '',
    isValid: false
  }

  handleChange = (event) => {
    this.checkEmtyKeyword();
    this.setState({[event.target.id]: event.target.value});
  }
  
  onSubmit = (event) => {
    this.props.submit(this.state.searchKeyword, this.state.searchType);
    this.setState({searchType: 'username', searchKeyword: '', isValid: false});
    event.preventDefault();
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
            {
              this.props.accFormat.map(option => (
                <option value={option.value} key={option.value}>{option.label}</option>
              ))
            }
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