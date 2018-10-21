import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import UploadFileArea from './containers/UploadFileArea';

class App extends Component {
  render() {
    return (
      <div>
        <UploadFileArea />
      </div>
    );
  }
}

export default App;
