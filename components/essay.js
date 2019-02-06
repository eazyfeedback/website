import { useState } from "react";
import PropTypes, { func } from "prop-types";
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

const Essay = ({ essay, user, classes }) => {
  const [checkoffInProgress, setCheckoff] = useState(false);
  const startCheckoff = () => setCheckoff(true);
  const endCheckoff = () => endCheckoff(false);
  const showQuestion = essay.question.length > 0;
  const showLink = user;
  return (
    <Card className={classes.card} style={{ height: "100%" }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Stage
        </Typography>
        <Typography variant="body1" className={classes.text} gutterBottom>
          {essay.stage}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Areas
        </Typography>
        {essay.areas.map((area, idx) => (
          <Typography key={idx} variant="body1" className={classes.text} gutterBottom>
            {`${idx + 1}. ${area}`}
          </Typography>
        ))}
        {showLink && (
          <>
            <Typography color="textSecondary">Link</Typography>
            <Typography variant="body1" className={classes.text} gutterBottom>
              {essay.link}
            </Typography>
          </>
        )}
        {showQuestion && (
          <>
            <Typography color="textSecondary">Question</Typography>
            <Typography variant="body1" className={classes.text}>
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
      />
    </Card>
  );
};

const styledBy = (property, mapping) => props => mapping[props[property]];

const styles = theme => ({
  card: {
    minWidth: 120,
    backgroundColor: styledBy("color", {
      red: theme.palette.secondary.main,
      blue: theme.palette.primary.main,
      white: theme.palette.background.paper
    })
  },
  actions: {
    display: "flex"
  },
  text: {
    color: styledBy("color", {
      red: theme.palette.common.white,
      blue: theme.palette.common.white,
      white: theme.palette.text.primary
    })
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

function getColors(user, essay) {
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

const withColorProps = EssayStyled => ({ user, essay }) => {
  const color = getColors(user, essay);
  return <EssayStyled color={color} user={user} essay={essay} />;
};

export default withColorProps(withStyles(styles)(Essay));
