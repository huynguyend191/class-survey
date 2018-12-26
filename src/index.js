import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import authReducer from './store/reducers/authReducer';
import accReducer from './store/reducers/accReducer';
import surveyReducer  from './store/reducers/surveyReducer';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const rootReducer = combineReducers({
  authReducer,
  accReducer,
  surveyReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
