import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import NextLink from "next/link";
import MaterialLink from "@material-ui/core/Link";

const Appbar = ({ classes }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <NextLink href="/" prefetch passHref>
          <MaterialLink variant="body1" color="inherit" className={classes.logo}>
            essayfeedback
          </MaterialLink>
        </NextLink>
        <NextLink href="/post" passHref prefetch>
          <Button className={classes.button} color="inherit">
            get feedback
          </Button>
        </NextLink>
        <NextLink href="/essays" passHref prefetch>
          <Button className={classes.button} color="inherit">
            review essay
          </Button>
        </NextLink>
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
    fontSize: "1.2rem"
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

Appbar.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Appbar);
