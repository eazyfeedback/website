import { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { getAreas } from "../pages/post";

const areasList = getAreas();
const formatAreas = checked => checked.map((bool, idx) => (bool ? areasList[idx] : "")).filter(elem => elem !== "");

const getAreasLength = areas => areas.reduce((acc, curr) => (curr ? acc + curr : acc), 0);

const Essay = ({ stage, areas, question, link, classes, user }) => (
  <Card className={classes.card} style={{ height: "100%" }}>
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
      {formatAreas(areas).map((area, idx) => (
        <Typography key={idx} variant="body1" gutterBottom={idx === getAreasLength(areas) - 1}>
          {`${idx + 1}. ${area}`}
        </Typography>
      ))}
      {question && (
        <Fragment>
          <Typography color="textSecondary">Question</Typography>
          <Typography variant="body1">{question}</Typography>
        </Fragment>
      )}
    </CardContent>
    {user && (
      <CardActions className={classes.actions}>
        <Button href={link} target="_blank" rel="noreferrer" color="secondary">
          review
        </Button>
      </CardActions>
    )}
  </Card>
);

const styles = () => ({
  card: {
    minWidth: 120
  },
  actions: {
    display: "flex"
  }
});

Essay.propTypes = {
  question: PropTypes.string,
  stage: PropTypes.string.isRequired,
  areas: PropTypes.arrayOf(PropTypes.bool).isRequired,
  link: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default withStyles(styles)(Essay);
