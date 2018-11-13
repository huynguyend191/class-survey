import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import uuidv4 from 'uuid/v4';

import classes from './UploadFileArea.module.css';
import ExcelIcon from '../../../assets/icons/excel.png';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


import axios from '../../../utils/axiosConfig';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';

class UploadFileArea extends Component {
  state = {
    files: [],
    isUploading: false,
    error: null,
  }

  onSelectedFiles = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      alert('Not excel file');
    }
    const renamedFiles = [];
    acceptedFiles.forEach(file => {
      const myNewFile = new File([file], file.name.split(".xlsx")[0] + '~' + uuidv4() +'.xlsx', {type: file.type});
      renamedFiles.push(myNewFile);
    })
    let newFiles = this.state.files.concat(renamedFiles);
    this.setState({files: newFiles});
  }

  onRemoveFile = (fileName) => {
    const files = this.state.files;
    const newFiles = [];
    files.forEach(file => {
      if(file.name !== fileName) {
        newFiles.push(file);
      }
    })
    this.setState({files: newFiles});
  }

  onUpload = () => {
    let formData = new FormData();
    //upload multiples files
    this.state.files.forEach(file=> {
      formData.append('myArrayOfFiles', file);
    })
    this.setState({isUploading: true});
    const url =  this.props.match.url;
    console.log(url);
    axios('/products/upload',{
      method: 'POST',
      data: formData,
    })
    .then(res => {
      this.setState({isUploading: false, files: []});
      console.log(res.data);
    }).catch(err => {
      this.setState({isUploading: false, error: err.message});
    })
  }

  handleCloseError = () => {
    this.setState({error: null});
  }

  render() {
    const dropzoneRef = React.createRef();
    let selectedFiles = (
      <div>
        <p>Drag file here or click select button</p>
        
      </div>
    );
    let uploadAvailability = true;
    if (this.state.files.length > 0) {
      uploadAvailability =  false;
      selectedFiles = (
        this.state.files.map( (file) => {
          let fileName = file.name.split("~")[0];
          return <li 
            className={classes.Filename} key={file.name}>
            <img className={classes.ExcelIcon} src={ExcelIcon} alt="" />
            {fileName}
            <IconButton style={{ backgroundColor: 'transparent' }} onClick={() => this.onRemoveFile(file.name)}>
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </li>;
        })
      )
    }
    return (
      <div className={classes.UploadFileArea}>
        <ErrorModal 
          isOpen = {this.state.error ? true : false}
          handleCloseModal = {this.handleCloseError}
          error = {this.state.error}
        />
        <Dropzone 
          className={classes.Dropzone}
          onDrop={this.onSelectedFiles}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          ref={dropzoneRef}
          disableClick
        >
          {selectedFiles}
        </Dropzone>
        <Button 
          className={classes.Button} 
          variant="contained" 
          color="primary" 
          size="small" 
          onClick={() => { dropzoneRef.current.open() }}
          >Select
          <FolderOpenIcon className={classes.FolderOpenIcon}/>
        </Button>
        <Button 
          className={classes.Button} 
          variant="contained" 
          color="primary"
          size="small" 
          onClick={this.onUpload} 
          disabled={uploadAvailability}
          >
          Upload
          {this.state.isUploading ? 
            <CircularProgress className={classes.UploadingIcon} size={15}/>
            :
            <CloudUploadIcon className={classes.CloudUploadIcon} />
          }
        </Button>
      </div>
    );
  }
}

export default UploadFileArea;