import React, { Component } from 'react';
import { Dialog, IconButton, Button, CircularProgress, Tooltip } from '@material-ui/core';
import Close from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import classes from './SurveyVersionDetail.module.css';
import axios from '../../../utils/axiosConfig';
import UploadedModal from '../../../components/UploadedModal/UploadedModal';
import  { invertObjectServerToClient, invertObjectClientToServer } from '../../../utils/invertObject';
import _ from 'lodash';
class SurveyVersionDetail extends Component {
  state = {
    version: null,
    versionName: null,

    //edit name
    invalidVersionNameErr: null,
    validVersionName: true,

    isLoading: false,
    succesfulModal: false,

    //input to add, edit
    inputValueSubCategory: null,
    isEditingSubCategory: false,
    inputErrorSubCategory: null,
    isValidInputSubCategory: false,

    //different value
    subCatergory: null,
    category: null
  }
  componentDidMount(){
    this.setState({version: this.props.version, versionName: this.props.version.Version});
  }
  handleClose = () => {
    this.props.history.push(this.props.returnPath);
    this.props.handleRefresh();
  }
  handleSubmit = () => {
    this.setState({isLoading: true});
    axios.put('/api/VersionSurveys/' + this.state.version.Id,{
      Version: this.state.versionName,
      Content: JSON.stringify(this.state.version.ContentCategory)
    })
    .then(result => {
      this.setState({succesfulModal: true, isLoading: false})
    })
    .catch(error => {
      this.setState({isLoading: false});
      console.log(error)
    })
  }
  removeCategory = (category) => {
    const content = invertObjectServerToClient(this.state.version.ContentCategory);
    delete content[category];
    const versionDetail = {
      ...this.state.version,
      ContentCategory: invertObjectClientToServer(content)
    }
    this.setState({
      version: versionDetail
    })
    
  }
  removeSubCategory = (subCatergory) => {
    const content = this.state.version.ContentCategory;
    delete content[subCatergory];
    const versionDetail = {
      ...this.state.version,
      ContentCategory: content
    }
    this.setState({
      version: versionDetail
    })
  }
  handleVersionNameChange = (event) => {
    let isValid = true;
    let error = null;
    this.setState({
      invalidVersionNameErr: error, 
      validVersionName: isValid
    })
    this.setState({
      versionName: event.target.value
    })
    if (event.target.value.trim() === '' || Number.isInteger(Number(event.target.value)) === false) {
      error = 'Version name must be an interger';
      isValid = false;
      this.setState({invalidVersionNameErr: error, validVersionName: isValid})
    }
    this.setState({invalidVersionNameErr: error, validVersionName: isValid})
  }
  addSubcategory = (category) => {
    this.setState({isEditingSubCategory: true, inputValueSubCategory: null, inputErrorSubCategory: null, isValidInputSubCategory: false, category: category});
  }
  handleSubCategoryInputChange = (event) => {
    this.setState({inputValueSubCategory: event.target.value});
    if(event.target.value.trim() === '') {
      this.setState({inputErrorSubCategory: 'Sub category cannot be emty', isValidInputSubCategory: false});
    }else {
      this.setState({inputErrorSubCategory: null, isValidInputSubCategory: true});
    }
  }
  saveSubCategory = () => {
    const content = {...this.state.version.ContentCategory, ...{[this.state.inputValueSubCategory]: this.state.category}};
    const versionDetail = {
      ...this.state.version,
      ContentCategory: content
    }
    this.setState({isEditingSubCategory: false, version: versionDetail})
  }
  closeInputSubCategory = () => {
    this.setState({isEditingSubCategory: false})
  }
  render() {
    let versionContent = null; //data
    let renderContent = null; //render HTML
    let isContentEmty;
    if (this.state.version) {
      versionContent = invertObjectServerToClient(this.state.version.ContentCategory);
      if(_.isEmpty(versionContent)) {
        isContentEmty = true;
      } else {
        isContentEmty = false;
      }
      const renderItems = Object.keys(versionContent).map(key => {
        const listItems = versionContent[key].map(item => {
          //return sub category
          return (
            <li key={item}>
              <p>{item}
                <IconButton 
                  style={{ backgroundColor: 'transparent', padding: '3px', margin:'auto', float: 'right' }} 
                  onClick={() => this.removeSubCategory(item)}>
                  <DeleteIcon fontSize="small" color="error" />
                </IconButton>
              </p>
            </li>
          )
        })
        return (
          //return category
          <li key={key}>
            <p>{key}
            <Tooltip title='Remove'>
              <IconButton 
                style={{ backgroundColor: 'transparent', padding: '3px', margin:'auto', float: 'right' }} 
                onClick={() => this.removeCategory(key)}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Tooltip>
            <Tooltip title='Add sub-category'>
              <IconButton 
                style={{ backgroundColor: 'transparent', padding: '3px', margin:'auto', float: 'right' }} 
                onClick={() => this.addSubcategory(key)}>
                <AddIcon fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
            </p>
            <ol>{listItems}</ol>
          </li>
        )
      })
      //return nested list
      renderContent = (
        <div>
          <div>Version: <input className={classes.VersionInput} value={this.state.versionName} type="number" onChange={this.handleVersionNameChange}/>  
            <Button 
              className={classes.SaveButton} 
              variant="contained" 
              color="primary" 
              size="small" 
              style={{height: '24px', paddingTop: '0', paddingBottom: '0', marginLeft: '5px'}}
              disabled={!this.state.validVersionName || isContentEmty}
              onClick={this.handleSubmit}
            >SAVE
              
              {this.state.isLoading ? 
                <CircularProgress style={{marginLeft: '3px', color: 'white'}} size={15}/>
                :
                <SaveIcon style={{marginLeft: '3px'}} className={classes.SaveIcon}/>
              }
            </Button>
            <div style={{color: 'red', fontSize: '12px', height: '15px'}}>{this.state.invalidVersionNameErr}</div>
          </div>
          <ol type="I" className={classes.FormList}>{renderItems}</ol>
        </div>
      )
    }
    return (
      <Dialog
        open={true}
        fullWidth={true}
        maxWidth={'md'}
        // onClose = {this.handleClose}
      > 
        <UploadedModal isOpen={this.state.succesfulModal} handleCloseModal={this.handleClose} />
        <Dialog
          open={this.state.isEditingSubCategory}
          onClose={this.closeInputSubCategory}
        >
          <div className={classes.InputArea}>
            <div>Add Sub-category</div>
            <textarea className={classes.CategoryInput} value={this.state.inputValueSubCategory} onChange={this.handleSubCategoryInputChange} />
            <div style={{fontSize: '12px', height: '14px', color: 'red', margin: '2px auto'}}>{this.state.inputErrorSubCategory}</div>
            <Button 
              variant="contained" 
              color="primary" 
              size="small" 
              style={{float: 'right'}}
              onClick={this.saveSubCategory}
              disabled={!this.state.isValidInputSubCategory}
            >Ok</Button>
          </div>
        </Dialog>
        <div className={classes.SurveyVerDetail}>
          <div className={classes.Header}>
            <p style={{fontSize: '27px', margin: 'auto 0', fontWeight: '500'}}>Survey Detail</p>
            <IconButton className={classes.CloseButton} onClick={this.handleClose}><Close color="primary" /></IconButton>
          </div>
          <div className={classes.Content}>
            {renderContent}
          </div>
        </div>
       
          
      </Dialog>
     
    );
  }
}

export default SurveyVersionDetail;