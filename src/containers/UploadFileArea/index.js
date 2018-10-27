import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

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
    axios.post('http://127.0.0.1:3001/', formData)
    .then((res)=>{
      console.log(res)})
  }

  render() {
    
    let selectedFiles = <p>Please drop the file here</p>;
    let uploadAvailability = true;
    if (this.state.files.length > 0) {
      uploadAvailability =  false;
      selectedFiles = (
        this.state.files.map( (file, index) => {
          return <li className={styles.Filename} key={index} onClick={() => alert(index)}><img className={styles.ExcelIcon} src={ExcelIcon} alt="" />{file.name}</li>
        })
      )
    }
    return (
      <div className={styles.UploadFileArea}>
        <Dropzone 
          className={styles.Dropzone}
          onDrop={this.onSelectedFiles}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        
        >
          {selectedFiles}
        </Dropzone>
      
        <button onClick={this.onUpload} disabled={uploadAvailability}>Upload</button>

      </div>
    );
      
      
  }
}

export default UploadFileArea;