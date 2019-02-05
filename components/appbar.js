import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import NextLink from "next/link";
import MaterialLink from "@material-ui/core/Link";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FolderIcon from "@material-ui/icons/Folder";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import withWidth from "@material-ui/core/withWidth";
import { withRouter } from "next/router";
import Hidden from "@material-ui/core/Hidden";
import compose from "recompose/compose";
import classNames from "classnames";
import Menu from "./menu";

const isActive = (route, href) => route === href;

const Appbar = ({ classes, handleLogin, handleLogout, user, router: { route } }) => (
  <AppBar position="sticky">
    <Toolbar>
      <NextLink href="/" prefetch passHref>
        <MaterialLink
          color="textPrimary"
          variant="body1"
          className={classNames(classes.logo, {
            [classes.activeNav]: isActive(route, "/")
          })}
        >
          essayfeedback
        </MaterialLink>
      </NextLink>

      <NextLink href="/post" prefetch>
        <Button className={classes.buttonClass}>
          <CreateIcon
            className={classNames(classes.icon, {
              [classes.activeNav]: isActive(route, "/post")
            })}
          />
          <Hidden
            smDown
            className={classNames({
              [classes.activeNav]: isActive(route, "/post")
            })}
          >
            post
          </Hidden>
        </Button>
      </NextLink>

      <NextLink href="/essays" prefetch>
        <Button className={classes.buttonClass}>
          <FolderIcon
            className={classNames(classes.icon, {
              [classes.activeNav]: isActive(route, "/essays")
            })}
          />
          <Hidden
            smDown
            className={classNames({
              [classes.activeNav]: isActive(route, "/essays")
            })}
          >
            post
          </Hidden>
        </Button>
      </NextLink>

      <NextLink href="/profile" prefetch>
        <Button className={classes.buttonClass}>
          <AccountCircleIcon
            className={classNames(classes.icon, {
              [classes.activeNav]: isActive(route, "/profile")
            })}
          />
          <Hidden
            smDown
            className={classNames({
              [classes.activeNav]: isActive(route, "/profile")
            })}
          >
            post
          </Hidden>
        </Button>
      </NextLink>

      {user ? (
        <Menu handleLogout={handleLogout} user={user} />
      ) : (
        <Button onClick={handleLogin} className={classes.button} variant="outlined">
          <LockOpenIcon className={classes.icon} />
          <Hidden smDown>sign in</Hidden>
        </Button>
      )}
    </Toolbar>
  </AppBar>
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
      marginRight: 0
    },
    root: {
      flexGrow: 1
    }
  },
  activeNav: {
    color: theme.palette.common.white
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
