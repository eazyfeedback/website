import { withStyles } from "@material-ui/core";

const Layout = ({ children, classes }) => <div className={classes.root}>{children}</div>;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Layout);
