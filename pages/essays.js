import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import getConfig from "next/config";
import Essay from "../components/essay";

async function fetchEssays() {
  const {
    publicRuntimeConfig: { APIEndpoint }
  } = getConfig();
  const { data } = await axios.get(APIEndpoint);
  return { essays: data };
}

function Essays({ essays, classes }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        {essays.map(({ stage, areas, question, link, customArea }, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
            <Essay stage={stage} areas={areas} question={question} link={link} customArea={customArea} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Essays.getInitialProps = fetchEssays;

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

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

export default withStyles(styles)(Essays);
