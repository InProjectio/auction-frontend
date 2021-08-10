/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as formReducer } from 'redux-form'
import history from 'utils/history';
import commonReducer from '../layout/CommonLayout/reducer'
import companyLayoutReducer from '../layout/CompanyLayout/slices'
import chatReducer from '../pages/ChatPage/reducer'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    form: formReducer,
    common: commonReducer,
    companyLayout: companyLayoutReducer,
    chat: chatReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
