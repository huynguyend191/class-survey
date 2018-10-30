import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
  isAuthenticated: false,
  error: null,
  loading: false
}

const reducer = ( state =  initialState, action) => {
  switch (action.type) {
    case actionTypes.START_SIGN_IN:
    return updateObject (state, {loading: true});
    case actionTypes.SIGN_IN_SUCCESSFUL:
      return updateObject (state, {isAuthenticated: true, error: null, loading: false});
    case actionTypes.SIGN_IN_FAILED:
      return updateObject (state, {error: action.error, loading: false});
    case actionTypes.SIGN_OUT:
      return updateObject (state, {isAuthenticated: false, error: null});
    default:
      return state;
  }
}

export default reducer;