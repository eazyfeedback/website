import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import NextLink from "next/link";
import MaterialLink from "@material-ui/core/Link";
import { withRouter } from "next/router";
import Menu from "./menu";

const Appbar = ({ classes, handleLogin, handleLogout, user, router: { route } }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <NextLink href="/" prefetch passHref>
          <MaterialLink variant="body1" color="inherit" className={classes.logo}>
            <img src="/static/favicon-white.png" alt="logo" className={classes.logoImage} />
          </MaterialLink>
        </NextLink>
        <NextLink href="/post" passHref prefetch>
          <Button className={classes.button} color="inherit">
            post
          </Button>
        </NextLink>
        <NextLink href="/essays" passHref prefetch>
          <Button className={classes.button} color="inherit">
            essays
          </Button>
        </NextLink>
        {user ? (
          <Menu handleLogout={handleLogout} user={user} />
        ) : (
          <Button onClick={handleLogin} className={classes.button} color="inherit" variant="outlined">
            sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  </div>
);

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  logo: {
    flexGrow: 1,
    fontSize: "1.1rem"
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  logoImage: {
    width: 36,
    height: 36
  }
});

Appbar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default withRouter(withStyles(styles)(Appbar));
