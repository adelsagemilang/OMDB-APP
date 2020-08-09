import { connect } from 'react-redux';
import * as actions from 'store/home/actions';
import DetailComponent from './template';

export const mapStateToProps = (state: any) => {
  return {
    isLoadingSearch: state.home.isLoadingSearch,
    search: state.home.search,
  };
};

export const mapDispatchProps = {
  getSearch: actions.getSearchAsync.request,
};

const Detail = connect(mapStateToProps, mapDispatchProps)(DetailComponent);

export default Detail;
