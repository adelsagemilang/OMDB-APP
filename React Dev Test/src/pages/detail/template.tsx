import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import CircularProgress from '@material-ui/core/CircularProgress';
import { imgUrl } from '../../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'white',
      padding: '0px',
    },
    box: {
      position: 'relative',
      width: '100%',
      margin: 0,
    },
    avatar: {
      position: 'absolute',
      bottom: '-130px',
      left: '15px',
      width: '120px',
      boxShadow: '0px 5px 10px 6px rgb(105 105 105 / 50%)',
    },
    title: {
      color: '#464854',
      margin: '10px 0 !important',
    },
    infoWrapper: {
      paddingLeft: '150px',
    },
    back: {
      color: 'white',
      fontSize: '1.6rem',
      position: 'absolute',
      top: '20px',
    },
    progress: {
      height: '100vh',
    },
  }),
);

const Detail = props => {
  const { search, getSearch, match, history, isLoadingSearch } = props;
  const { imdbID } = match.params;
  const classes = useStyles();
  const imgPoster = imgUrl + imdbID;

  useEffect(() => {
    const params = {
      i: imdbID,
      plot: 'full',
    };
    getSearch(params);
  }, [imdbID, getSearch]);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      {!isLoadingSearch ? (
        <>
          <Box component="div" m={1} className={classes.box}>
            <Button size="large" onClick={handleBack} className={classes.back}>
              <KeyboardArrowLeft fontSize="large" />
            </Button>
            <div className="poster-wrapper">
              <img src={imgPoster} alt={search.title} />
            </div>
            <img
              src={search.Poster}
              className={classes.avatar}
              alt={search.Title}
            />
            <IconButton className="badges">
              <span>{search.imdbRating}</span>
            </IconButton>
          </Box>
          <Box component="div" className={classes.infoWrapper}>
            <h3 className={`bold ${classes.title}`}>{search.Title}</h3>
            <p className="text-muted m-b-10">Directed: {search.Director}</p>
            <p>Release time: {search.Released}</p>
            <p>Length of a film: {search.Runtime}</p>
            <p>{search.Genre}</p>
          </Box>
          <Grid container>
            <Grid item xs={12} className="p-20">
              <h3 className={`bold ${classes.title}`}>Synopsis</h3>
              <p>{search.Plot}</p>
            </Grid>
          </Grid>
        </>
      ) : (
        <div className={`flex-center ${classes.progress}`}>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

export default Detail;
