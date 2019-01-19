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
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              college applicant
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              post your essay to get feedback
            </Typography>
            <Link href="/post" passHref prefetch>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Post essay
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              reviewer
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              select an essay to give feedback on
            </Typography>
            <Link href="/essays" passHref prefetch>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                choose essay
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
    padding: theme.spacing.unit * 2,
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
