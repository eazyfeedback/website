import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Essay from "../src/essay";
import generate from "../data/essays";

function Essays({ data, classes }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        {data.map(({ stage, areas, questions }, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
            <Essay stage={stage} areas={areas} questions={questions} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Essays.getInitialProps = async () =>
  await {
    data: generate(10)
  };

Essays.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      questions: PropTypes.arrayOf(PropTypes.string),
      stage: PropTypes.string,
      areas: PropTypes.arrayOf(PropTypes.string)
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
