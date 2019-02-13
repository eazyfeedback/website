import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import NextLink from "next/link";
import withAuth from "../lib/auth";
import Layout from "../components/layout";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

function usePoints(user, APIEndpoint) {
  const [points, setPoints] = useState(0);

  function fetchProfile() {
    const endpoint = `${APIEndpoint}/users/${user.uid}/points`;
    axios.get(endpoint).then(res => setPoints(res.data.points));
  }

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);
  return points;
}

const Index = ({ classes, handleLogin, handleLogout, user, APIEndpoint }) => {
  const points = usePoints(user, APIEndpoint);
  return (
    <Layout handleLogin={handleLogin} handleLogout={handleLogout} user={user} signInRequired={false} signInVisible={false} message="">
      <Grid container style={{ minHeight: `calc(100vh - 96px)` }} justify="space-around" alignItems="center" direction="column">
        <Grid item className={classes.marginTop}>
          <Typography align="center" variant="h3" style={{ fontWeight: 300 }}>
            Get feedback for your essay - for Free!
          </Typography>
        </Grid>

        {user && (
          <Grid item className={classes.marginTop} style={{ minWidth: 300 }}>
            <Paper className={classes.paper2}>
              <Grid container>
                <Grid item xs={3}>
                  <Avatar alt={user.name} src={user.photoURL} className={classes.avatar} />
                </Grid>
                <Grid item xs={9}>
                  <Typography color="textSecondary">Welcome back</Typography>
                  <Typography variant="body1">{user.name}</Typography>
                  <Typography variant="body2">
                    <span style={{ fontWeight: 700 }}>{points}</span> points <span className={classes.stars}>✨</span>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

        <Grid item className={classes.marginTop}>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item style={{ minWidth: 320 }}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom className={classes.uppercase}>
                  writer
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Post your essay to get feedback
                </Typography>
                <NextLink href="/post" prefetch>
                  <Button href="/post" variant="contained" color="primary" className={classes.button}>
                    post essay
                  </Button>
                </NextLink>
              </Paper>
            </Grid>
            <Grid item style={{ minWidth: 320 }}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom className={classes.uppercase}>
                  reviewer
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Choose an essay to give feedback
                </Typography>
                <NextLink href="/essays" prefetch>
                  <Button href="/essays" color="secondary" variant="contained" className={classes.button}>
                    go to essays
                  </Button>
                </NextLink>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.marginTop}>
          <div style={{ marginBottom: 24 }}>
            <Typography align="center" variant="h6" gutterBottom>
              Your work is private and protected
            </Typography>
            <Typography align="center" gutterBottom>
              We use sharing links from Google docs to protect your essay. Your essay is only shared with reviewers.
            </Typography>
          </div>

          <div>
            <Typography align="center" variant="caption" gutterBottom>
              "Essayfeedback is what I wish I had during my college applications" - Samuel, co-founder.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};

const styles = theme => ({
  uppercase: {
    textTransform: "uppercase"
  },
  stars: {
    fontSize: "1rem",
    verticalAlign: "middle"
  },
  paper2: {
    padding: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: "center"
  },
  button: {
    margin: theme.spacing.unit
  },
  marginTop: {
    marginTop: theme.spacing.unit * 3
  },
  avatar: {
    width: 60,
    height: 60
  }
});

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default withStyles(styles)(withAuth(Index));
