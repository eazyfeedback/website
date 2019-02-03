import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Appbar from "../components/appbar";
import { SignInFirst } from "../components/shared";

const Layout = ({ children, classes, handleLogin, handleLogout, user, signInRequired, signInVisible }) => (
  <div style={{ minHeight: "100vh" }}>
    <Appbar handleLogin={handleLogin} handleLogout={handleLogout} user={user} />
    {signInVisible && !user && <SignInFirst handleLogin={handleLogin} message={message} />}
    {(!signInRequired || (signInRequired && user)) && <div className={classes.root}>{children}</div>}
  </div>
);

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
  signInVisible: PropTypes.bool.isRequired,
  signInRequired: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(styles)(Layout);
