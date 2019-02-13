import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Appbar from "./appbar";
import Signin from "./signin";

function Layout({ children, classes, handleLogin, handleLogout, user, signInRequired, signInVisible, message }) {
  const showSignin = signInVisible && !user;
  const showChildren = !signInRequired || (signInRequired && user);
  return (
    <div style={{ minHeight: "100vh" }}>
      <Appbar handleLogin={handleLogin} handleLogout={handleLogout} user={user} />
      {showSignin && <Signin handleLogin={handleLogin} message={message} />}
      {showChildren && <div className={classes.root}>{children}</div>}
    </div>
  );
}

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
