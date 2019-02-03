import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const SignIn = ({ handleLogin, message }) => (
  <div style={{ margin: 20 }}>
    <Typography gutterBottom>{message}</Typography>
    <Button onClick={handleLogin} color="primary" variant="outlined">
      sign in with google
    </Button>
  </div>
);

SignIn.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

function getBackgroundColor(user, essay) {
  if (user && essay) {
    switch (user.uid) {
      case essay.reviewerUID:
        return "#e91e63";
      case essay.ownerUID:
        return "#3f51b5";
      default:
        return "#fff";
    }
  }
  return "#fff";
}

function handleReview() {}

function handleRemove() {}

function handleCheckOff() {}

function handleComplete() {}

function Actions({ user, essay, postReview, classes }) {
  const isVisible = user && !postReview;
  const completeCondition = user.uid === essay.reviewerUID;
  const reviewCondition = !essay.reviewerUID && user.uid !== essay.ownerUID;
  return (
    <>
      {isVisible && (
        <CardActions className={classes.actions}>
          {user.uid === essay.ownerUID && (
            <Button href={essay.link} target="_blank" rel="noreferrer" color="inherit" onClick={handleRemove}>
              remove
            </Button>
          )}
          {completeCondition && (
            <>
              <Button href={essay.link} target="_blank" rel="noreferrer" color="inherit">
                check off
              </Button>
              <Button href={essay.link} target="_blank" rel="noreferrer" color="inherit">
                mark as complete
              </Button>
            </>
          )}
          {reviewCondition && (
            <Button href={essay.link} target="_blank" rel="noreferrer" color="inherit" onClick={handleReview}>
              review
            </Button>
          )}
        </CardActions>
      )}
    </>
  );
}

Actions.propTypes = {
  user: PropTypes.object,
  essay: PropTypes.object.isRequired,
  postReview: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

let Essay = ({ essay, user, classes, postReview }) => (
  <Card className={classes.card} style={{ height: "100%", backgroundColor: getBackgroundColor(user, essay) }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Stage
      </Typography>
      <Typography variant="body1" gutterBottom>
        {essay.stage}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Areas
      </Typography>
      {essay.areas.map((area, idx) => (
        <Typography key={idx} variant="body1" gutterBottom={idx === essay.areas.length - 1}>
          {`${idx + 1}. ${area}`}
        </Typography>
      ))}
      {postReview && (
        <>
          <Typography color="textSecondary">Link</Typography>
          <Typography variant="body1" gutterBottom>
            {essay.link}
          </Typography>
        </>
      )}
      {essay.question.length > 0 && (
        <>
          <Typography color="textSecondary">Question</Typography>
          <Typography variant="body1">{essay.question}</Typography>
        </>
      )}
    </CardContent>
    <Actions user={user} essay={essay} postReview={postReview} classes={classes} />
  </Card>
);

const essayStyles = () => ({
  card: {
    minWidth: 120
  },
  actions: {
    display: "flex"
  }
});

Essay.propTypes = {
  essay: PropTypes.shape({
    question: PropTypes.string,
    stage: PropTypes.string.isRequired,
    areas: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string.isRequired,
    reviewerUID: PropTypes.string,
    ownerUID: PropTypes.string.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  postReview: PropTypes.bool
};

Essay = withStyles(essayStyles)(Essay);

export { SignIn, Essay };
