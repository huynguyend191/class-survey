import React, { Component } from 'react';
import { Dialog, Paper, IconButton } from '@material-ui/core';
import Close from '@material-ui/icons/Cancel';
import classes from './SurveyVersionDetail.module.css';
import  { inverObjectServerToClient } from '../../../utils/invertObject';
class SurveyVersionDetail extends Component {
  state = {
    version: null
  }
  componentDidMount(){
    this.setState({version: this.props.version});
  }
  handleClose = () => {
    this.props.history.push(this.props.returnPath);
  }
  render() {
    let versionContent = null; //data
    let renderContent = null; //render HTML
    if (this.state.version) {
      versionContent = inverObjectServerToClient(this.state.version.ContentCategory);
      const renderItems = Object.keys(versionContent).map(key => {
        const listItems = versionContent[key].map(item => {
          //return sub category
          return <li key={item}><p>{item}</p></li>
        })
        return (
          //return category
          <li><p>{key}</p>
            <ol>{listItems}</ol>
          </li>
        )
      })
      //return nested list
      renderContent =(
        <ol type="I" className={classes.FormList}>{renderItems}</ol>
      )
    }
    return (
      <Dialog
        open={true}
        className={classes.DialogContainer}
        fullWidth={true}
        maxWidth={'md'}
      >
        <Paper className={classes.SurveyVerDetail}>
          <div className={classes.Header}>
            <p style={{fontSize: '27px', margin: '0', fontWeight: '500'}}>SURVEY DETAIL</p>
            <IconButton className={classes.CloseButton} onClick={this.handleClose}><Close color="primary" /></IconButton>
          </div>
          <div className={classes.Content}>
            {renderContent}
          </div>
        </Paper>
      </Dialog>
     
    );
  }
}

export default SurveyVersionDetail;