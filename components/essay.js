import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import APIEndpoint from "../lib/api";

function Actions({ user, essay, classes, buttonColor }) {
  const canRemove = user && user.uid === essay.ownerUID;
  const canComplete = user && user.uid === essay.reviewerUID;
  const canReview = user && !essay.reviewerUID && user.uid !== essay.ownerUID;
  function pageRefresh() {
    location.reload();
  }
  function handleReview() {
    return axios
      .patch(`${APIEndpoint}/essays/${essay.id}`, {
        reviewerUID: user.uid
      })
      .then(() => pageRefresh());
  }
  function handleComplete() {
    return axios
      .patch(`${APIEndpoint}/essays/${essay.id}`, {
        isReviewComplete: true
      })
      .then(() => pageRefresh());
  }
  function handleRemove() {
    return axios.delete(`${APIEndpoint}/essays/${essay.id}`).then(() => pageRefresh());
  }
  return (
    <CardActions className={classes.actions}>
      {canRemove && (
        <Button onClick={handleRemove} style={{ color: buttonColor }}>
          remove
        </Button>
      )}
      {canComplete && (
        <Button onClick={handleComplete} style={{ color: buttonColor }}>
          complete
        </Button>
      )}
      {canReview && (
        <Button onClick={handleReview} style={{ color: buttonColor }}>
          review
        </Button>
      )}
      <Button href={essay.link} target="_blank" rel="noreferrer" style={{ color: buttonColor }} variant="outlined">
        open
      </Button>
    </CardActions>
  );
}

Actions.propTypes = {
  user: PropTypes.object,
  essay: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  buttonColor: PropTypes.string.isRequired
};

function getStatus({ reviewerUID, isReviewComplete }) {
  if (isReviewComplete) return "Complete";
  if (reviewerUID && !isReviewComplete) return "Pending";
  return "No Reviewer yet";
}

const Essay = ({ essay, user, classes, theme, review }) => {
  const showQuestion = essay.question.length > 0;
  const showActions = user && !review;
  const { body, title, background, button } = getColors(user, essay, theme);

  return (
    <Card className={classes.card} style={{ height: "100%", backgroundColor: background }}>
      <CardContent>
        {
          <>
            <Typography style={{ color: title }} gutterBottom>
              Status
            </Typography>
            <Typography style={{ color: body }} gutterBottom>
              {getStatus(essay)}
            </Typography>
          </>
        }
        <Typography style={{ color: title }} gutterBottom>
          Stage
        </Typography>
        <Typography style={{ color: body }} gutterBottom>
          {essay.stage}
        </Typography>
        <Typography style={{ color: title }} gutterBottom>
          Areas
        </Typography>
        {essay.areas.map((area, idx) => (
          <Typography key={idx} style={{ color: body }} gutterBottom>
            {`${idx + 1}. ${area}`}
          </Typography>
        ))}
        {showQuestion && (
          <>
            <Typography style={{ color: title }} gutterBottom>
              Question
            </Typography>
            <Typography style={{ color: body }} gutterBottom>
              {essay.question}
            </Typography>
          </>
        )}
        {review && (
          <>
            <Typography style={{ color: title }} gutterBottom>
              Link
            </Typography>
            <Link href={essay.link} target="_blank" rel="noreferrer" style={{ color: body }} gutterBottom variant="body2">
              {essay.link}
            </Link>
          </>
        )}
      </CardContent>

      {showActions && <Actions user={user} essay={essay} classes={classes} buttonColor={button} />}
    </Card>
  );
};

export const essayPropTypes = PropTypes.shape({
  question: PropTypes.string,
  selectedAreas: PropTypes.arrayOf(PropTypes.bool).isRequired,
  selectedStage: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  reviewerUID: PropTypes.string,
  ownerUID: PropTypes.string.isRequired,
  id: PropTypes.string
}).isRequired;

Essay.propTypes = {
  classes: PropTypes.object.isRequired,
  essay: essayPropTypes,
  user: PropTypes.object,
  review: PropTypes.bool,
  theme: PropTypes.object.isRequired
};

function getColor(user, essay) {
  if (user && essay) {
    switch (user.uid) {
      case essay.reviewerUID:
        return "red";
      case essay.ownerUID:
        return "blue";
      default:
        return "white";
    }
  }
  return "white";
}

const styledBy = mappingFunc => (color, theme) => mappingFunc(theme)[color];

const getBackground = styledBy(theme => ({
  red: theme.palette.secondary.main,
  blue: theme.palette.primary.main,
  white: theme.palette.background.paper
}));

const getBody = styledBy(theme => ({
  red: theme.palette.common.white,
  blue: theme.palette.common.white,
  white: theme.palette.text.primary
}));

const getTitle = styledBy(theme => ({
  red: theme.palette.tertiary.main,
  blue: theme.palette.tertiary.main,
  white: theme.palette.text.secondary
}));

const getButton = styledBy(theme => ({
  red: theme.palette.tertiary.main,
  blue: theme.palette.tertiary.main,
  white: theme.palette.secondary.main
}));

function getColors(user, essay, theme) {
  const color = getColor(user, essay);
  return { body: getBody(color, theme), title: getTitle(color, theme), background: getBackground(color, theme), button: getButton(color, theme) };
}

const styles = () => ({
  card: {
    minWidth: 120
  },
  actions: {
    display: "flex"
  }
});

export default withStyles(styles, { withTheme: true })(Essay);
