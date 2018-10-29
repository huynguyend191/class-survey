import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import uuidv4 from 'uuid/v4';

import styles from './UploadFileArea.module.css';
import ExcelIcon from '../../assets/icons/excel.png';


import axios from 'axios';

class UploadFileArea extends Component {
  state = {
    files: [],
  }

  onSelectedFiles = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      alert('Not excel file');
    }
    let newFiles = this.state.files.concat(acceptedFiles);
    this.setState({files: newFiles});
  }

  onUpload = () => {
    let formData = new FormData();
    //upload multiples files
    this.state.files.forEach(file=> {
      formData.append('myArrayOfFiles', file);
    })
    console.log(formData);
    axios('http://localhost:3001/products/upload',{
      method: 'POST',
      data: formData,
      withCredentials: true,
    })
    .then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  render() {
    const dropzoneRef = React.createRef();
    let selectedFiles = (
      <div>
        <p>Drag and drop file here or click select button</p>
        
      </div>
    );
    let uploadAvailability = true;
    if (this.state.files.length > 0) {
      uploadAvailability =  false;
      selectedFiles = (
        this.state.files.map( (file) => {
          let key = uuidv4();
          return <li className={styles.Filename} key={key}><img className={styles.ExcelIcon} src={ExcelIcon} alt="" />{file.name}</li>
        })
      )
    }
    return (
      <div className={styles.UploadFileArea}>
        <Dropzone 
          className={styles.Dropzone}
          onDrop={this.onSelectedFiles}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          ref={dropzoneRef}
          disableClick
        >
          {selectedFiles}
        </Dropzone>
        <button onClick={() => { dropzoneRef.current.open() }}>
          Select Files
        </button>
        <button onClick={this.onUpload} disabled={uploadAvailability}>Upload</button>

      </div>
    );
      
      
  }
}

export default UploadFileArea;