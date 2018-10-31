import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
  isAuthenticated: false,
  error: null,
  loading: false,
  username: null,
  role: null
}

const reducer = ( state =  initialState, action) => {
  switch (action.type) {
    case actionTypes.START_SIGN_IN:
    return updateObject (state, {loading: true});
    case actionTypes.SIGN_IN_SUCCESSFUL:
      return updateObject (state, 
        {
          isAuthenticated: true,
          error: null, 
          loading: false,
          username: action.username,
          role: action.role
        }
      );
    case actionTypes.SIGN_IN_FAILED:
      return updateObject (state, {error: action.error, loading: false});
    case actionTypes.SIGN_OUT:
      return updateObject (state, 
        {
          isAuthenticated: false, 
          error: null,
          username: null,
          role: null
        }
      );
    default:
      return state;
  }
}

export default reducer;