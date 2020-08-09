import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import * as HomeTypes from './types';
import * as HomeActions from './actions';

const { getSearchAsync } = HomeActions;

export const isLoadingSearch = createReducer(false as boolean)
  .handleAction([getSearchAsync.request], (state, action) => true)
  .handleAction(
    [getSearchAsync.success, getSearchAsync.failure],
    (state, action) => false,
  );

export const search = createReducer(HomeTypes.Search).handleAction(
  getSearchAsync.success,
  (state, action) => action.payload,
);

const HomeReducer = combineReducers({
  isLoadingSearch,
  search,
});

export default HomeReducer;
export type HomeState = ReturnType<typeof HomeReducer>;
