import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";

const Index = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={16} alignItems="center" justify="center" style={{ height: `calc(100vh - 80px)` }}>
        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              college applicant
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Post your essay to get feedback
            </Typography>
            <Link href="/post" passHref prefetch>
              <Button variant="contained" color="primary" className={classes.button}>
                get feedback
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              reviewer
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Select an essay to give feedback on
            </Typography>
            <Link href="/essays" passHref prefetch>
              <Button variant="contained" color="secondary" className={classes.button}>
                review essay
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing.unit
  }
});

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
