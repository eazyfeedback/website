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

function Actions({ user, essay, classes, buttonColor }) {
  const showActions = user;
  const canRemove = user && user.uid === essay.ownerUID;
  let canComplete = user && user.uid === essay.reviewerUID;
  const canReview = !essay.reviewerUID && user && user.uid !== essay.ownerUID;
  const [showLink, setShowLink] = useState(false);

  function handleReview(user, essay) {
    setShowLink(true);
    return axios.patch(`${APIEndpoint}/essays/${essay._id}`, {
      reviewerUID: user.uid
    });
  }

  function handleRemove(essay) {
    return axios.delete(`${APIEndpoint}/essays/${essay._id}`);
  }

  function handleComplete(essay) {
    return axios.patch(`${APIEndpoint}/essays/${essay._id}`, {
      isReviewComplete: true
    });
  }
  return (
    <>
      {showActions && (
        <CardActions className={classes.actions}>
          {canRemove && (
            <Button onClick={handleRemove} style={{ color: buttonColor }}>
              remove
            </Button>
          )}
          {canComplete && (
            <Button onClick={handleComplete} style={{ color: buttonColor }}>
              mark as complete
            </Button>
          )}
          {canReview && (
            <Button href={showLink ? "#" : essay.link} target="_blank" rel="noreferrer" onClick={handleReview} style={{ color: buttonColor }}>
              {showLink ? "go to essay" : "review"}
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
  buttonColor: PropTypes.string.isRequired
};

const Essay = ({ essay, user, classes, theme, review }) => {
  const showQuestion = essay.question.length > 0;
  const { body, title, background, button } = getColors(user, essay, theme);
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
        {showQuestion && (
          <>
            <Typography style={{ color: title }}>Question</Typography>
            <Typography variant="body1" style={{ color: body }}>
              {essay.question}
            </Typography>
          </>
        )}
        {review && (
          <>
            <Typography style={{ color: title }}>Link</Typography>
            <Typography variant="body1" style={{ color: body }} gutterBottom>
              {essay.link}
            </Typography>
          </>
        )}
      </CardContent>
      <Actions user={user} essay={essay} classes={classes} buttonColor={button} />
    </Card>
  );
};

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
