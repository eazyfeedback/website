import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import getProfile from "../data/profile";
import { Typography } from "@material-ui/core";

const Profile = ({ classes, data: { reviewed, submitted } }) => (
  <div>
    <Grid container className={classes.root} spacing={16}>
      <Grid item sm={6}>
        <Typography>{submitted}</Typography>
      </Grid>
      <Grid item sm={6}>
        {reviewed}
      </Grid>
    </Grid>
  </div>
);

Profile.getInitialProps = async () =>
  await {
    data: getProfile()
  };

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
