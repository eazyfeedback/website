import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Essay from "../components/essay";
import getConfig from "next/config";

const Essays = ({ essays, classes }) => (
  <div className={classes.root}>
    <Grid container spacing={16}>
      {essays.map(({ stage, areas, question, link }, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
          <Essay stage={stage} areas={areas} question={question} link={link} />
        </Grid>
      ))}
    </Grid>
  </div>
);

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
      link: PropTypes.string.isRequired
    })
  ),
  classes: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default withStyles(styles)(Essays);
