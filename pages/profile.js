import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
            <List>
              <ListItem style={{ textAlign: "center" }}>
                <ListItemText primary={props.user.displayName} secondary={props.user.email} />
              </ListItem>
              <ListItem>
                <ListItemText secondary="# posted" />
                <ListItemText primary="3" />
              </ListItem>
              <ListItem>
                <ListItemText secondary="# reviewed" />
                <ListItemText primary="0" />
              </ListItem>
            </List>
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
