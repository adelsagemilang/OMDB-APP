import { createAsyncAction } from 'typesafe-actions';
import * as HomeTypes from './types';

export const getSearchAsync = createAsyncAction(
  HomeTypes.SearchActions.GET_DATA_REQUEST,
  HomeTypes.SearchActions.GET_DATA_SUCCESS,
  HomeTypes.SearchActions.GET_DATA_FAILURE,
)<HomeTypes.SearchTypes, typeof HomeTypes.Search[], string>();
