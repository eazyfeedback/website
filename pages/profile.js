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

const {
  publicRuntimeConfig: { APIEndpoint }
} = getConfig();

async function fetch(url) {
  const {
    data: { count }
  } = await axios.get(url);
  return count;
}

const Profile = ({ user, classes, handleLogin, handleLogout }) => {
  const [counts, setCounts] = useState([0, 0]);
  function fetchCounts() {
    const endpoint = path => `${APIEndpoint}/users/${user.uid}/${path}/count`;
    const postedURL = endpoint("posted");
    const reviewedURL = endpoint("reviewed");
    Promise.all([fetch(postedURL), fetch(reviewedURL)]).then(cts => setCounts(cts));
  }
  useEffect(() => {
    if (user) fetchCounts();
  }, []);
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
