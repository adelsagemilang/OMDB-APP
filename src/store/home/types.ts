export const Search = {
  Search: [],
  totalResults: '0',
  Response: 'False',
};

export interface SearchTypes {
  s?: string;
  page?: number;
  i?: string;
  plot?: string;
}

export enum SearchActions {
  GET_DATA_REQUEST = '@@SEARCH/GET_DATA_REQUEST',
  GET_DATA_SUCCESS = '@@SEARCH/GET_DATA_SUCCESS',
  GET_DATA_FAILURE = '@@SEARCH/GET_DATA_FAILURE',
}
