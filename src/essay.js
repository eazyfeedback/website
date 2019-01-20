import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Essay({ stage, areas, questions, classes }) {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Stage
        </Typography>
        <Typography variant="body1" gutterBottom>
          {stage}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Areas
        </Typography>
        {areas.map((area, idx) => (
          <Typography
            key={idx}
            component="p"
            gutterBottom={idx === areas.length - 1}
          >
            {`${idx + 1}. ${area}`}
          </Typography>
        ))}
        <Typography color="textSecondary">Questions</Typography>
        {questions.map((question, idx) => (
          <Typography key={idx}>{`${idx + 1}. ${question}`}</Typography>
        ))}
      </CardContent>
      <CardActions className={classes.action}>
        <Button size="small">review</Button>
      </CardActions>
    </Card>
  );
}

const styles = () => ({
  card: {
    minWidth: 120
  },
  actions: {
    display: "flex"
  }
});

Essay.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  stage: PropTypes.string.isRequired,
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Essay);
