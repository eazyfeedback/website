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

function Actions({ user, essay }) {
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
    <CardActions>
      {canRemove && <Button onClick={handleRemove}>remove</Button>}
      {canComplete && (
        <Button onClick={handleComplete} color="secondary">
          complete
        </Button>
      )}
      {canReview && (
        <Button onClick={handleReview} color="primary" variant="contained">
          review
        </Button>
      )}
      <Button href={essay.link} target="_blank" rel="noreferrer" variant="outlined">
        open
      </Button>
    </CardActions>
  );
}

Actions.propTypes = {
  user: PropTypes.object,
  essay: PropTypes.object.isRequired,
  buttonColor: PropTypes.string.isRequired
};

function getColor(user, essay, theme) {
  if (user && essay) {
    switch (user.uid) {
      case essay.reviewerUID:
        return theme.palette.secondary.main;
      case essay.ownerUID:
        return theme.palette.primary.main;
      default:
        return theme.palette.background.paper;
    }
  }
}

const Essay = ({ essay, user, review, classes, theme }) => {
  const showQuestion = essay.question.length > 0;
  const showActions = user && !review;
  const color = getColor(user, essay, theme);
  const border = `1px solid ${color}`;
  return (
    <Card className={classes.card} style={{ ...(color && { border }) }}>
      <CardContent>
        <Typography gutterBottom color="textSecondary" variant="body2">
          Stage
        </Typography>
        <Typography gutterBottom>{essay.stage}</Typography>
        <Typography gutterBottom color="textSecondary" variant="body2">
          Areas
        </Typography>
        {essay.areas.map((area, idx) => (
          <Typography key={idx} gutterBottom>
            {`${idx + 1}. ${area}`}
          </Typography>
        ))}
        {showQuestion && (
          <>
            <Typography gutterBottom color="textSecondary" variant="body2">
              Question
            </Typography>
            <Typography gutterBottom>{essay.question}</Typography>
          </>
        )}
        {review && (
          <>
            <Typography gutterBottom color="textSecondary" variant="body2">
              Link
            </Typography>
            <Link href={essay.link} target="_blank" rel="noreferrer" gutterBottom variant="body2">
              {essay.link}
            </Link>
          </>
        )}
      </CardContent>
      {showActions && <Actions user={user} essay={essay} />}
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

const styles = () => ({
  card: {
    minWidth: 120,
    height: "100%"
  }
});

export default withStyles(styles, { withTheme: true })(Essay);
