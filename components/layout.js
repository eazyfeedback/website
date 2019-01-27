import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import NextLink from "next/link";
import MaterialLink from "@material-ui/core/Link";

let Appbar = function({ classes }) {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NextLink href="/" prefetch passHref>
            <MaterialLink variant="h6" color="inherit" className={classes.grow}>
              essayfeedback
            </MaterialLink>
          </NextLink>
          <NextLink href="/post" passHref prefetch>
            <Button color="inherit">get feedback</Button>
          </NextLink>
          <NextLink href="/essays" passHref prefetch>
            <Button color="inherit">review essay</Button>
          </NextLink>
          <NextLink href="/login" passHref prefetch>
            <Button color="inherit" onClick={handleLogin}>
              login
            </Button>
          </NextLink>
          <NextLink href="/signup" passHref prefetch>
            <Button color="inherit" onClick={handleLogout}>
              sign up
            </Button>
          </NextLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const AppbarStyles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

Appbar = withStyles(AppbarStyles)(Appbar);

Appbar.propTypes = {
  classes: PropTypes.object.isRequired
};

const Layout = ({ children, classes }) => (
  <div className={classes.root}>
    <Appbar />
    {children}
  </div>
);

const layoutStyles = theme => ({
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

export default withStyles(layoutStyles)(Layout);
