import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import getConfig from "next/config";
import axios from "axios";

const {
  publicRuntimeConfig: { APIEndpoint }
} = getConfig();

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

function handleReview(user, essay) {
  return axios.patch(`${APIEndpoint}/essays/${essay.id}`, {
    reviewerUID: user.uid
  });
}

function handleRemove(essay) {
  return axios.delete(`${APIEndpoint}/essays${essay.id}`);
}

function handleComplete(essay) {
  return axios.patch(`${APIEndpoint}/essays/${essay.id}`, {
    isReviewComplete: true
  });
}

function Actions({ user, essay, classes, checkoffInProgress, startCheckoff, endCheckoff }) {
  const showActions = user;
  const canRemove = user && user.uid === essay.ownerUID;
  let canComplete = user && user.uid === essay.reviewerUID;
  const canReview = !essay.reviewerUID && user && user.uid !== essay.ownerUID;
  const finishCheckoff = () => {
    endCheckoff();
    handleComplete(essay);
  };
  return (
    <>
      {showActions && (
        <CardActions className={classes.actions}>
          {canRemove && (
            <Button href={essay.link} target="_blank" rel="noreferrer" color="inherit" onClick={handleRemove}>
              remove
            </Button>
          )}
          {canComplete &&
            (checkoffInProgress ? (
              <Button href={essay.link} target="_blank" rel="noreferrer" color="inherit" onClick={finishCheckoff}>
                mark as complete
              </Button>
            ) : (
              <Button href={essay.link} target="_blank" rel="noreferrer" color="inherit" onClick={startCheckoff}>
                check off
              </Button>
            ))}
          {canReview && (
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
  classes: PropTypes.object.isRequired,
  checkoffInProgress: PropTypes.bool,
  startCheckoff: PropTypes.func.isRequired,
  endCheckoff: PropTypes.func.isRequired
};

let Essay = ({ essay, user, classes }) => {
  const [checkoffInProgress, setCheckoff] = useState(false);
  const startCheckoff = () => setCheckoff(true);
  const endCheckoff = () => endCheckoff(false);
  const showQuestion = essay.question.length > 0;
  const showLink = user;

  return (
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
        {showLink && (
          <>
            <Typography color="textSecondary">Link</Typography>
            <Typography variant="body1" gutterBottom>
              {essay.link}
            </Typography>
          </>
        )}
        {showQuestion && (
          <>
            <Typography color="textSecondary">Question</Typography>
            <Typography variant="body1">{essay.question}</Typography>
          </>
        )}
      </CardContent>
      <Actions
        user={user}
        essay={essay}
        classes={classes}
        checkoffInProgress={checkoffInProgress}
        startCheckoff={startCheckoff}
        endCheckoff={endCheckoff}
      />
    </Card>
  );
};

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
  user: PropTypes.object
};

Essay = withStyles(essayStyles)(Essay);

export { SignIn, Essay };
