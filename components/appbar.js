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
import Tooltip from "@material-ui/core/Tooltip";
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
          underline={isActive(route, "/") ? "always" : "hover"}
        >
          <Hidden mdUp>
            <Tooltip title="Home">
              <img src={`/static/logo${isActive(route, "/") ? "-white" : ""}.png`} alt="essayfeedback" className={classes.logoImage} />
            </Tooltip>
          </Hidden>
          <Hidden smDown>
            <Tooltip title="Home">
              <span
                className={classNames({
                  [classes.activeNav]: isActive(route, "/")
                })}
              >
                essayfeedback
              </span>
            </Tooltip>
          </Hidden>
        </MaterialLink>
      </NextLink>

      <NextLink href="/post" prefetch>
        <Tooltip title="Post essay for feedback">
          <Button className={classes.buttonClass}>
            <CreateIcon
              className={classNames(classes.icon, {
                [classes.activeNav]: isActive(route, "/post")
              })}
            />
            <Hidden smDown>
              <span
                className={classNames(classes.navText, {
                  [classes.activeNav]: isActive(route, "/post")
                })}
              >
                post
              </span>
            </Hidden>
          </Button>
        </Tooltip>
      </NextLink>

      <NextLink href="/essays" prefetch>
        <Tooltip title="Essays awaiting review">
          <Button className={classes.buttonClass}>
            <FolderIcon
              className={classNames(classes.icon, {
                [classes.activeNav]: isActive(route, "/essays")
              })}
            />
            <Hidden smDown>
              <span
                className={classNames(classes.navText, {
                  [classes.activeNav]: isActive(route, "/essays")
                })}
              >
                essays
              </span>
            </Hidden>
          </Button>
        </Tooltip>
      </NextLink>

      <Hidden smDown>
        <NextLink href="/profile" prefetch>
          <Tooltip title="My Profile">
            <Button className={classes.buttonClass}>
              <AccountCircleIcon
                className={classNames(classes.icon, {
                  [classes.activeNav]: isActive(route, "/profile")
                })}
              />
              <span
                className={classNames(classes.navText, {
                  [classes.activeNav]: isActive(route, "/profile")
                })}
              >
                profile
              </span>
            </Button>
          </Tooltip>
        </NextLink>
      </Hidden>

      {user ? (
        <Menu handleLogout={handleLogout} user={user} />
      ) : (
        <Tooltip title="Login / Sign up">
          <Button onClick={handleLogin} className={classes.button} variant="outlined">
            <ExitToAppIcon className={classes.icon} />
            <span className={classes.navText}>sign in</span>
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  </AppBar>
);

const styles = theme => ({
  logo: {
    flexGrow: 1,
    fontSize: "1.1rem"
  },
  logoImage: {
    width: "2rem",
    height: "2rem"
  },
  button: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    }
  },
  icon: {
    fontSize: 24,
    root: {
      flexGrow: 1
    }
  },
  activeNav: {
    color: theme.palette.common.white
  },
  navText: {
    marginLeft: theme.spacing.unit
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
