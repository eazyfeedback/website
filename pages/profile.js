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
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          {props.user && (
            <>
              <Avatar alt={props.user.displayName} src={props.user.photoURL} className={classes.avatar} />
              <Typography>{props.user.displayName}</Typography>
              <Typography>{props.user.email}</Typography>
              <Typography>{props.user.metadata.creationTime}</Typography>
              <Typography>{props.user.metadata.lastSignInTime}</Typography>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object
};

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

export default withStyles(styles)(Profile);
