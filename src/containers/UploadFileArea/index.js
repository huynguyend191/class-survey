import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import xlsxParser from 'xlsx-parse-json';

import styles from './UploadFileArea.module.css';
import ExcelIcon from '../../assets/icons/excel.png';



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

  onUpload= () => {
    console.log(this.state.files);
    
    xlsxParser
    .onFileSelection(this.state.files[0])
    .then(data => {
      let parsedData = data;
      console.log(parsedData);
    });
  }

  render() {
    const openFileExplorer = React.createRef();
    let selectedFiles = <p>Please drop the file here</p>;
    let uploadAvailability = true;
    if (this.state.files.length > 0) {
      uploadAvailability =  false;
      selectedFiles = (
        this.state.files.map( file => {
          return <li className={styles.Filename} key={file.lastModifiedDate}><img className={styles.ExcelIcon} src={ExcelIcon} alt="" />{file.name}</li>
        })
      )
    }
    return (
      <div className={styles.UploadFileArea}>
        <Dropzone 
          className={styles.Dropzone}
          onDrop={this.onSelectedFiles}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          disableClick
          ref={openFileExplorer}
        >
          {selectedFiles}
        </Dropzone>
        <button onClick={() => openFileExplorer.current.open()}>Select file</button>
        <button onClick={this.onUpload} disabled={uploadAvailability}>Upload</button>
      </div>
    );
      
      
  }
}

export default UploadFileArea;