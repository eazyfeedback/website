import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const Layout = ({ children, classes }) => <div className={classes.root}>{children}</div>;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
