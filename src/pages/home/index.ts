import { connect } from 'react-redux';
import * as actions from 'store/home/actions';
import HomeComponent from './template';

export const mapStateToProps = (state: any) => ({
  isLoadingSearch: state.home.isLoadingSearch,
  search: state.home.search,
});

export const mapDispatchProps = {
  getSearch: actions.getSearchAsync.request,
};

const Home = connect(mapStateToProps, mapDispatchProps)(HomeComponent);

export default Home;
