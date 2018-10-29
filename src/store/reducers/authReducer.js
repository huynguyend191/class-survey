import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
  isAuthenticated: false,
  error: null
}

const reducer = ( state =  initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_SUCCESSFUL:
      return updateObject (state, {isAuthenticated: true});
    case actionTypes.SIGN_IN_FAILED:
      return updateObject (state, {error: action.error});
    default:
      return state;
  }
}

export default reducer;