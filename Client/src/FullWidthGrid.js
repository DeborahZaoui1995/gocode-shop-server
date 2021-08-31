import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import RangeSlider from './components/RangeSlider';
import ResponsiveDrawer from './components/ResponsiveDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <ResponsiveDrawer />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper >xs=12</Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
            {/* <Header className={classes.paper} categories={props.categories} onChange={props.onChange} /> */}
         
        </Grid>

        <Grid item xs={12} sm={6}>
            <RangeSlider className={classes.paper}/>
          {/* <Paper className={classes.paper}>xs=12 sm=6</Paper> */}
        </Grid>

        {/* <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid> */}

      </Grid>
    </div>
  );
}