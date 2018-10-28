import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
  isAuthenticated: false,
  error: null
}

const reducer = ( state =  initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFUL:
      return updateObject (state, {isAuthenticated: true});
    case actionTypes.LOGIN_FAILED:
      return updateObject (state, {error: action.error});
    default:
      return state;
  }
}

export default reducer;