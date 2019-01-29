import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

function Profile(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      {props.user && (
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
          <Grid item xs={12}>
            <Avatar alt={props.user.displayName} src={props.user.photoURL} className={classes.avatar} />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item sm={6} xs={12}>
                <Typography color="textSecondary">name</Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography>{props.user.displayName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item sm={6} xs={12}>
                <Typography color="textPrimary">email</Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography>{props.user.email}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item sm={6} xs={12}>
                <Typography color="textSecondary">essays posted</Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography>x</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item sm={6} xs={12}>
                <Typography color="textSecondary">essays reviewed</Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography>x</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item sm={6} xs={12}>
                <Typography color="textSecondary">reviews</Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Typography>x</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  avatar: {
    margin: theme.spacing.unit,
    width: 120,
    height: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default withStyles(styles)(Profile);
