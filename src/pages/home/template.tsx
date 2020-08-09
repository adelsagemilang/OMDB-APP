import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Container from '@material-ui/core/Container';
import SearchBar from 'components/home/searchBar';
import ListMovies from 'components/home/listMovies';
import { mapStateToProps, mapDispatchProps } from 'pages/home';
import ModalCommons from 'components/commons/modalCommons';
import { imgUrl } from '../../constants';

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchProps;

interface State {
  searchQuery: string;
  imgTarget: string;
  isOpenModal: boolean;
}

export default class Home extends Component<Props, State> {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      searchQuery: 'batman',
      imgTarget: '',
      isOpenModal: false,
    };
  }

  handleChangeSearch(e) {
    this.setState({ searchQuery: e.target.value });
  }

  toggleModal(isOpenModal) {
    this.setState({ isOpenModal });
  }

  setImage(id) {
    const imgTarget = imgUrl + id;
    this.toggleModal(true);
    this.setState({
      imgTarget,
    });
  }

  render() {
    const { search, getSearch, isLoadingSearch } = this.props;
    const { searchQuery, isOpenModal, imgTarget } = this.state;
    return (
      <Container maxWidth="sm">
        <SearchBar change={this.handleChangeSearch} />
        <ListMovies
          fetch={getSearch}
          lists={search.Search || []}
          searchQuery={searchQuery}
          isLoading={isLoadingSearch}
          setImage={this.setImage}
        />
        <ModalCommons isOpenModal={isOpenModal} toggleModal={this.toggleModal}>
          <img src={imgTarget} height={600} alt="Poster" />
        </ModalCommons>
      </Container>
    );
  }
}
