import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";

const Layout = ({ children, classes }) => <Paper className={classes.root}>{children}</Paper>;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Layout);
