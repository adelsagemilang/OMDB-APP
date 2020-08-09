import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { history } from 'utils/history';
import useInfiniteScroll from '../commons/useInfiniteScroll';
import usePrevious from '../commons/usePrevious';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      minHeight: '100vh',
    },
    wrapper: {
      width: '100%',
      paddingBottom: '20px',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

const ListMovies = props => {
  const { fetch, lists, searchQuery, isLoading, setImage } = props;
  const [listItems, setListItems] = useState(lists);
  const [search, setSearch] = useState('batman');
  const prevSearch = usePrevious(search);
  const [page, setPages] = useState(1);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchScroll);
  const classes = useStyles();

  function fetchScroll() {
    const params = {
      s: search,
      page: page + 1,
    };
    fetch(params);
    setPages(params.page);
  }

  useEffect(() => {
    if (prevSearch === search && page !== 1) {
      setListItems(listItems => listItems.concat(lists));
    } else {
      setListItems(lists);
    }
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists, prevSearch, search]);

  useEffect(() => {
    setSearch(searchQuery);
    if (prevSearch !== search) {
      fetch({ s: searchQuery, page: 1 });
      setPages(1);
    }
  }, [prevSearch, search, searchQuery, page, fetch, setIsFetching]);

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.wrapper} cols={2}>
        {listItems.length > 0 ? (
          listItems.map(list => (
            <GridListTile
              key={list.imdbID}
              className="pointer"
              onClick={() => setImage(list.imdbID)}
            >
              <img
                src={
                  list.Poster === 'N/A'
                    ? 'https://placehold.it/300x300&text=Image+Not+Found'
                    : list.Poster
                }
                alt={list.Title}
              />
              <GridListTileBar
                title={list.Title}
                subtitle={<span>{list.Year}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`${list.Title}`}
                    className={classes.icon}
                    onClick={() => history.push(`/movie/${list.imdbID}`)}
                  >
                    <Tooltip title="See Details" placement="top">
                      <InfoIcon />
                    </Tooltip>
                  </IconButton>
                }
              />
            </GridListTile>
          ))
        ) : (
          <p className="text-center full-width flex-center">
            {isLoading ? 'Loading...' : 'Movies not found'}
          </p>
        )}
      </GridList>
      {(isFetching || isLoading) && <CircularProgress />}
    </div>
  );
};

export default ListMovies;
