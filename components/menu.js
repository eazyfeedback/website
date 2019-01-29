import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import MaterialLink from "@material-ui/core/Link";
import NextLink from "next/link";

function MenuProfile({ handleLogout, user, classes }) {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);
  function handleToggle() {
    setOpen(!open);
  }
  function handleClose(event) {
    if (anchorEl.current.contains(event.target)) return;
    setOpen(false);
  }
  return (
    <div className={classes.root}>
      <Button color="inherit" buttonRef={anchorEl} onClick={handleToggle} disableRipple>
        <Avatar alt={user.displayName} src={user.photoURL} className={classes.avatar} />
      </Button>
      <Popper open={open} anchorEl={anchorEl.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem className={classes.menuItem} onClick={handleClose}>
                    <NextLink href="/profile" prefetch passHref>
                      <MaterialLink underline="none" color="inherit">
                        Profile
                      </MaterialLink>
                    </NextLink>
                  </MenuItem>
                  <MenuItem className={classes.menuItem} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

const styles = theme => ({
  root: {
    display: "flex",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  menuItem: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  }
});

MenuProfile.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuProfile);
