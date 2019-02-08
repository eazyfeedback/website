import { useState } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Layout from "../components/layout";
import withAuth from "../components/auth";
import getConfig from "next/config";
import { useEffect } from "react";
import axios from "axios";

const {
  publicRuntimeConfig: { APIEndpoint }
} = getConfig();

const Profile = ({ user, classes, handleLogin, handleLogout }) => {
  const [counts, setCounts] = useState([0, 0]);
  function fetchCounts() {
    const endpoint = `${APIEndpoint}/users/${user.uid}/profile`;
    axios.get(endpoint).then(res => setCounts(res.data.profile));
  }
  useEffect(() => {
    if (user) fetchCounts();
  }, [user]);
  return (
    <Layout
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      user={user}
      signInRequired={true}
      signInVisible={true}
      message="You need to signin to access your profile"
    >
      {user && (
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
          <Grid item xs={12}>
            <Avatar alt={user.name} src={user.photoURL} className={classes.avatar} />
            <List>
              <ListItem style={{ textAlign: "center" }}>
                <ListItemText primary={user.name} secondary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemText secondary="# posted" />
                <ListItemText primary={counts[0]} />
              </ListItem>
              <ListItem>
                <ListItemText secondary="# reviewed" />
                <ListItemText primary={counts[1]} />
              </ListItem>
              <ListItem>
                <ListItemText secondary="rating" />
                <ListItemText primary={counts[2]} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    width: 120,
    height: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default withStyles(styles)(withAuth(Profile));
