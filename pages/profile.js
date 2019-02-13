import { useState } from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Layout from "../components/layout";
import Typography from "@material-ui/core/Typography";
import withAuth from "../lib/auth";
import { useEffect } from "react";
import axios from "axios";
import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Essays } from "./essays";
import APIEndpoint from "../lib/api";

const pointsTip =
  "You earn points based on the number of essays you review and the rating you get after completing. Top reviwers are listed on the home page!";

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

function EssayTabs({}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  function handleChange(event, newValue) {
    setValue(newValue);
  }
  function handleChangeIndex(index) {
    setValue(index);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant={null}>
          <Tab label="Pending" />
          <Tab label="Completed" />
        </Tabs>
      </AppBar>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabContainer>Item One</TabContainer>
        <TabContainer>Item Two</TabContainer>
      </SwipeableViews>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}));

function useProfile(user) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (user) {
      const endpoint = `${APIEndpoint}/users/${user.uid}/profile`;
      axios.get(endpoint).then(res => setProfile(res.data.profile));
    }
  }, [user]);
  return profile;
}

function getStatus({ reviewerUID, isReviewComplete }) {
  if (isReviewComplete) return "Complete";
  if (reviewerUID && !isReviewComplete) return "Pending";
  return "No Reviewer yet";
}

function splitEssays(essays) {
  return {
    completed,
    pending
  };
}

const Profile = ({ user, classes, handleLogin, handleLogout }) => {
  const profile = useProfile(user);
  return (
    <Layout
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      user={user}
      signInRequired={true}
      signInVisible={true}
      message="You need to signin to access your profile"
    >
      <div>
        {user && profile && (
          <>
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
                      <Typography variant="body2">
                        <span style={{ fontWeight: 700 }}>{profile.points}</span> points <span className={classes.stars}>✨</span>
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider variant="middle" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography color="textSecondary">essays posted</Typography>
                      <Typography variant="h4">{profile.essaysPosted.length}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography color="textSecondary">essays reviewed</Typography>
                      <Typography variant="h4">{profile.essaysReviewedCount}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={16}>
              {profile.essaysReviewing.length > 0 && (
                <Grid item>
                  <Typography variant="subtitle1" color="textSecondary">
                    Essays reviewing
                  </Typography>
                  <Essays user={user} essays={profile.essaysReviewing} />
                </Grid>
              )}

              {profile.essaysPosted.length > 0 && (
                <Grid item>
                  <Typography variant="subtitle1" color="textSecondary">
                    My Essays
                  </Typography>
                  <Essays user={user} essays={profile.essaysPosted} />
                </Grid>
              )}
            </Grid>
          </>
        )}
      </div>
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
  },
  stars: {
    fontSize: "1rem",
    verticalAlign: "middle",
    color: "transparent",
    textShadow: `0 0 0 ${theme.palette.secondary.main}`
  }
});

export default withStyles(styles)(withAuth(Profile));
