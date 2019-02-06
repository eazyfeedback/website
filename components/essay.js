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

function Actions({ user, essay, classes, checkoffInProgress, startCheckoff, endCheckoff, buttonColor }) {
  const showActions = user;
  const canRemove = user && user.uid === essay.ownerUID;
  let canComplete = user && user.uid === essay.reviewerUID;
  const canReview = !essay.reviewerUID && user && user.uid !== essay.ownerUID;
  function finishCheckoff() {
    endCheckoff();
    handleComplete(essay);
  }
  return (
    <>
      {showActions && (
        <CardActions className={classes.actions}>
          {canRemove && (
            <Button href={essay.link} target="_blank" rel="noreferrer" onClick={handleRemove} style={{ color: buttonColor }}>
              remove
            </Button>
          )}
          {canComplete &&
            (checkoffInProgress ? (
              <Button href={essay.link} target="_blank" rel="noreferrer" onClick={finishCheckoff} style={{ color: buttonColor }}>
                mark as complete
              </Button>
            ) : (
              <Button href={essay.link} target="_blank" rel="noreferrer" onClick={startCheckoff} style={{ color: buttonColor }}>
                check off
              </Button>
            ))}
          {canReview && (
            <Button href={essay.link} target="_blank" rel="noreferrer" onClick={handleReview} style={{ color: buttonColor }}>
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
  endCheckoff: PropTypes.func.isRequired,
  buttonColor: PropTypes.string.isRequired
};

const Essay = ({ essay, user, classes, theme }) => {
  const [checkoffInProgress, setCheckoff] = useState(false);
  const startCheckoff = () => setCheckoff(true);
  const endCheckoff = () => endCheckoff(false);
  const showQuestion = essay.question.length > 0;
  const showLink = user;
  const { body, title, background } = getColors(user, essay, theme);
  return (
    <Card className={classes.card} style={{ height: "100%", backgroundColor: background }}>
      <CardContent>
        <Typography style={{ color: title }} gutterBottom>
          Stage
        </Typography>
        <Typography variant="body1" style={{ color: body }} gutterBottom>
          {essay.stage}
        </Typography>
        <Typography style={{ color: title }} gutterBottom>
          Areas
        </Typography>
        {essay.areas.map((area, idx) => (
          <Typography key={idx} variant="body1" style={{ color: body }} gutterBottom>
            {`${idx + 1}. ${area}`}
          </Typography>
        ))}
        {showLink && (
          <>
            <Typography style={{ color: title }}>Link</Typography>
            <Typography variant="body1" style={{ color: body }} gutterBottom>
              {essay.link}
            </Typography>
          </>
        )}
        {showQuestion && (
          <>
            <Typography style={{ color: title }}>Question</Typography>
            <Typography variant="body1" style={{ color: body }}>
              {essay.question}
            </Typography>
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
        buttonColor={title}
      />
    </Card>
  );
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

function getColors(user, essay, theme) {
  const color = getColor(user, essay);
  return { body: getBody(color, theme), title: getTitle(color, theme), background: getBackground(color, theme) };
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
  classes: PropTypes.object.isRequired,
  essay: PropTypes.shape({
    question: PropTypes.string,
    stage: PropTypes.string.isRequired,
    areas: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string.isRequired,
    reviewerUID: PropTypes.string,
    ownerUID: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Essay);
