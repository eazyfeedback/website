import { useState } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Layout from "../components/layout";
import Typography from "@material-ui/core/Typography";
import withAuth from "../components/auth";
import getConfig from "next/config";
import { useEffect } from "react";
import axios from "axios";
import { Essays } from "./essays";

const {
  publicRuntimeConfig: { APIEndpoint }
} = getConfig();

const Profile = ({ user, classes, handleLogin, handleLogout }) => {
  const [profile, setProfile] = useState([0, 0, 0, []]);
  function fetchCounts() {
    const endpoint = `${APIEndpoint}/users/${user.uid}/profile`;
    axios.get(endpoint).then(res => setProfile(res.data.profile));
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
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">{user.name}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {user.email}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider variant="middle" />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography color="textSecondary"># posted</Typography>
                  <Typography variant="h4">{profile[0]}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography color="textSecondary"># reviewed</Typography>
                  <Typography variant="h4">{profile[1]}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography color="textSecondary">rating</Typography>
                  <Typography variant="h4">{profile[2]}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Grid container spacing={16}>
              <Typography variant="subtitle1" color="textSecondary">
                My Essays
              </Typography>
              <Essays user={user} essays={profile[3]} />
            </Grid>
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
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center"
  }
});

export default withStyles(styles)(withAuth(Profile));
