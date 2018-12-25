import React, { Component } from 'react';
import { connect } from 'react-redux';


import classes from './StudentClassList.module.css';

class StudentClassList extends Component {

  
  componentDidMount() {
    console.log(this.props.studentId)
  }

  

  render() {
    return (
      <div className={classes.StudentClassList}>
        Student Class List
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    studentId: state.authReducer.id
  }
}

export default connect(mapStateToProps)(StudentClassList);