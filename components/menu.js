import { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  }
}));

function MenuProfile({ handleLogout, photoURL }) {
  const classes = useStyles();
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
    <>
      <Button onClick={handleLogout} className={classes.button} variant="outlined" color="inherit">
        logout
      </Button>
      <Avatar alt="Remy Sharp" src={photoURL} className={classes.avatar} />
      <Button buttonRef={anchorEl} onClick={handleToggle}>
        Toggle Menu Grow
      </Button>
      <Popper open={open} anchorEl={anchorEl.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

MenuProfile.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  photoURL: PropTypes.string.isRequired
};

export default MenuProfile;
