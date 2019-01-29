import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { SignInFirst } from "../components/shared";

const Profile = ({ user, classes, handleLogin }) => (
  <div className={classes.root}>
    {user ? (
      <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
        <Grid item xs={12}>
          <Avatar alt={user.displayName} src={user.photoURL} className={classes.avatar} />
          <List>
            <ListItem style={{ textAlign: "center" }}>
              <ListItemText primary={user.displayName} secondary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemText secondary="essays posted for feedback" />
              <ListItemText primary="0" />
            </ListItem>
            <ListItem>
              <ListItemText secondary="essays reviewed" />
              <ListItemText primary="0" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    ) : (
      <SignInFirst message="You need to signin to access your profile" handleLogin={handleLogin} />
    )}
  </div>
);

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
  },
  user: PropTypes.object,
  handleLogin: PropTypes.func
});

export default withStyles(styles)(Profile);
