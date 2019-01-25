import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Essay from "../components/essay";
import getConfig from "next/config";
import { useEffect, useState } from "react";

const {
  publicRuntimeConfig: { APIEndpoint }
} = getConfig();

async function fetchEssays() {
  const { data } = await axios.get(APIEndpoint);
  return { essaysProps: data };
}

function Essays({ essaysProps, classes }) {
  const [essays, setEssays] = useState(essaysProps);

  useEffect(async () => {
    if (!essaysProps) {
      const { essaysProps: essays } = await fetchEssays();
      setEssays(essays);
    }
  });

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

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

Essays.getInitialProps = fetchEssays;

Essays.propTypes = {
  essaysProps: PropTypes.arrayOf(
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
