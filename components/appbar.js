import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import NextLink from "next/link";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FolderIcon from "@material-ui/icons/Folder";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import withWidth from "@material-ui/core/withWidth";
import { withRouter } from "next/router";
import Hidden from "@material-ui/core/Hidden";
import compose from "recompose/compose";
import classNames from "classnames";

const isActive = (route, href) => route === href;

const Appbar = ({ classes, handleLogin, handleLogout, user, router: { route } }) => (
  <AppBar position="sticky">
    <Toolbar>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <NextLink href="/" prefetch>
            <Tooltip title="Home">
              <Button href="/" className={classes.button}>
                <Hidden mdUp>
                  <img src={`/static/logo${isActive(route, "/") ? "White" : ""}.png`} alt="essayfeedback" className={classes.logoImage} />
                </Hidden>
                <Hidden smDown>
                  <span
                    className={classNames(classes.nav, {
                      [classes.active]: isActive(route, "/")
                    })}
                  >
                    essayfeedback
                  </span>
                </Hidden>
              </Button>
            </Tooltip>
          </NextLink>
        </Grid>

        <Grid item>
          <NextLink href="/post" prefetch>
            <Tooltip title="Post essay for feedback">
              <Button href="/post" className={classes.button}>
                <CreateIcon
                  className={classNames(classes.icon, {
                    [classes.active]: isActive(route, "/post")
                  })}
                />
                <Hidden smDown>
                  <span
                    className={classNames(classes.nav, classes.navItem, {
                      [classes.active]: isActive(route, "/post")
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
              <Button href="/essays" className={classes.button}>
                <FolderIcon
                  className={classNames(classes.icon, {
                    [classes.active]: isActive(route, "/essays")
                  })}
                />
                <Hidden smDown>
                  <span
                    className={classNames(classes.nav, classes.navItem, {
                      [classes.active]: isActive(route, "/essays")
                    })}
                  >
                    essays
                  </span>
                </Hidden>
              </Button>
            </Tooltip>
          </NextLink>

          <NextLink href="/profile" prefetch>
            <Tooltip title="My Profile">
              <Button href="/profile" className={classes.button}>
                <AccountCircleIcon
                  className={classNames(classes.icon, {
                    [classes.active]: isActive(route, "/profile")
                  })}
                />
                <Hidden smDown>
                  <span
                    className={classNames(classes.nav, classes.navItem, {
                      [classes.active]: isActive(route, "/profile")
                    })}
                  >
                    profile
                  </span>
                </Hidden>
              </Button>
            </Tooltip>
          </NextLink>

          <Button onClick={user ? handleLogout : handleLogin} variant="outlined" className={classes.button}>
            {user ? <Avatar alt={user.name} src={user.photoURL} className={classes.avatar} /> : <ExitToAppIcon className={classes.icon} />}
            <span className={classNames(classes.nav, classes.navItem)}>{user ? "logout" : "sign in"}</span>
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

const styles = theme => ({
  logoImage: {
    width: 30,
    height: 30
  },
  icon: {
    fontSize: 24
  },
  button: {
    "&:hover": {
      color: theme.palette.common.white
    },
    "&:hover img": {
      content: "url('/static/logoWhite.png')"
    }
  },
  active: {
    color: theme.palette.common.white
  },
  nav: {
    fontWeight: 400
  },
  navItem: {
    marginLeft: theme.spacing.unit
  },
  avatar: {
    width: 24,
    height: 24
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
