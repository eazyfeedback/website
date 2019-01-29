import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import NextLink from "next/link";
import MaterialLink from "@material-ui/core/Link";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FolderIcon from "@material-ui/icons/Folder";
import CreateIconIcon from "@material-ui/icons/Create";
import withWidth from "@material-ui/core/withWidth";
import { withRouter } from "next/router";
import Hidden from "@material-ui/core/Hidden";
import compose from "recompose/compose";
import classNames from "classnames";
import Menu from "./menu";

const navButtonStyles = {
  activeButton: {
    color: "#e91e63"
  },
  inActiveButton: {
    color: "#fafafa"
  }
};

const NavButton = ({ route, href, children, buttonClass }) => (
  <NextLink href={href} passHref prefetch>
    <Button className={buttonClass}>{children(route === href ? navButtonStyles.activeButton : navButtonStyles.inActiveButton)}</Button>
  </NextLink>
);

NavButton.propTypes = {
  route: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  buttonClass: PropTypes.string.isRequired
};

const Appbar = ({ classes, handleLogin, handleLogout, user, router: { route } }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <NextLink href="/" prefetch passHref>
          <MaterialLink variant="body1" color="inherit" className={classes.logo}>
            essayfeedback
          </MaterialLink>
        </NextLink>
        <NavButton
          href="/post"
          route={route}
          buttonClass={classes.button}
          children={navClass => (
            <>
              <CreateIconIcon className={classNames(classes.icon, navClass)} />
              <Hidden smDown className={classNames(navClass)}>
                post
              </Hidden>
            </>
          )}
        />
        <NavButton
          href="/essays"
          route={route}
          buttonClass={classes.button}
          children={navClass => (
            <>
              <FolderIcon className={classNames(classes.icon, navClass)} />
              <Hidden smDown className={classNames(navClass)}>
                essays
              </Hidden>
            </>
          )}
        />
        {user ? (
          <Menu handleLogout={handleLogout} user={user} />
        ) : (
          <Button onClick={handleLogin} className={classes.button} color="inherit" variant="outlined">
            <AccountCircleIcon className={classes.icon} />
            <Hidden smDown>sign in</Hidden>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  </div>
);

const styles = theme => ({
  logo: {
    flexGrow: 1,
    fontSize: "1.1rem"
  },
  button: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    }
  },
  icon: {
    fontSize: 24,
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing.unit
    },
    root: {
      flexGrow: 1
    }
  }
});

Appbar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
  width: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  withWidth()
)(withRouter(Appbar));
