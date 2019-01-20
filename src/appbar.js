import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NextLink from "next/link";
import MaterialLink from "@material-ui/core/Link";

const styles = {
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

function ButtonAppBar(props) {
  const { classes } = props;
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
            <Button color="inherit">post</Button>
          </NextLink>
          <NextLink href="/essays" passHref prefetch>
            <Button color="inherit">essays</Button>
          </NextLink>
          <NextLink href="/login" passHref prefetch>
            <Button variant="contained" color="default">
              login
            </Button>
          </NextLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
