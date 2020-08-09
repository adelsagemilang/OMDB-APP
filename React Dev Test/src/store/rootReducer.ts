import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { ApplicationState } from 'store/rootState';
import { History } from 'history';

// modules
import HomeReducer from './home/reducer';

export const rootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    home: HomeReducer,
    router: connectRouter(history),
  });
