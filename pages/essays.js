import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Essay from "../components/essay";

function Essays({ essays, classes }) {
  return (
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
}

Essays.getInitialProps = async () => ({
  essays: []
});

Essays.propTypes = {
  essays: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      stage: PropTypes.string,
      areas: PropTypes.arrayOf(PropTypes.string),
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
