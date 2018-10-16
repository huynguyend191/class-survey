import React, { Component } from 'react';
import UploadFileArea from './containers/UploadFileArea';
import { Route, Link, withRouter } from 'react-router-dom';

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
