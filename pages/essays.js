import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Essay from "../components/essay";

function Essays({ essays, classes }) {
  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        {essays.map(({ stage, areas, questions }, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
            <Essay stage={stage} areas={areas} questions={questions} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Essays.getInitialProps = async ({ req: { db } }) =>
  await {
    essays: db
      .collection("essays")
      .find()
      .sort({ createdAt: -1 })
      .toArray()
  };

Essays.propTypes = {
  essays: PropTypes.arrayOf(
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
