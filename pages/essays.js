import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Essay from "../components/essay";
import getConfig from "next/config";

function Essays({ essays, classes }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={16} />
    </div>
  );
}

Essays.getInitialProps = async () => {
  const {
    publicRuntimeConfig: { APIEndpoint }
  } = getConfig();
  const { data } = await axios.get(APIEndpoint);
  return { essays: data };
};

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

Essays.propTypes = {
  essays: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      stage: PropTypes.string.isRequired,
      areas: PropTypes.arrayOf(PropTypes.bool).isRequired,
      customArea: PropTypes.String,
      link: PropTypes.string.isRequired
    })
  ),
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Essays);
