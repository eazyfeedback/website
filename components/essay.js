import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MoodIcon from "@material-ui/icons/Mood";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import APIEndpoint from "../lib/api";
import { useEffect } from "react";

function Actions({ user, essay, classes: { icon, button } }) {
  const canRemove = user && user.uid === essay.ownerUID;
  const canComplete = user && user.uid === essay.reviewerUID;
  const canReview = user && !essay.reviewerUID && user.uid !== essay.ownerUID;
  const canOpen = canComplete || canRemove;
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
    <CardActions style={{ paddingTop: 0 }}>
      {canRemove && (
        <Button className={button} size="small" onClick={handleRemove}>
          <DeleteIcon className={icon} />
          remove
        </Button>
      )}
      {canReview && (
        <Button className={button} size="small" onClick={handleReview} color="primary" variant="contained">
          <MoodIcon className={icon} />
          review
        </Button>
      )}
      {canOpen && (
        <Link className={button} href={essay.link} target="_blank" rel="noreferrer" variant="button">
          open
        </Link>
      )}
      {canComplete && (
        <Button className={button} size="small" onClick={handleComplete} color="secondary" variant="contained">
          <DoneIcon className={icon} />
          complete
        </Button>
      )}
    </CardActions>
  );
}

Actions.propTypes = {
  user: PropTypes.object,
  essay: PropTypes.object.isRequired
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

function usePhotoURL(uid) {
  const [photoURL, setPhotoURL] = useState("");
  useEffect(() => {
    const endpoint = `${APIEndpoint}/users/${uid}/photoURL`;
    axios.get(endpoint).then(res => setPhotoURL(res.data.photoURL));
  }, []);
  return photoURL;
}

function Essay({ essay, user, review, classes, theme }) {
  const showQuestion = essay.question.length > 0;
  const showActions = user && !review;
  const color = getColor(user, essay, theme);
  const border = `1px solid ${color}`;
  const photoURL = usePhotoURL(essay.ownerUID);
  return (
    <Card className={classes.card} style={{ ...(color && { border }) }}>
      <CardContent>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography gutterBottom color="textSecondary" variant="body2">
              Stage
            </Typography>
            <Typography gutterBottom>{essay.stage}</Typography>
          </Grid>
          {user && (
            <Grid item>
              <Avatar
                alt={user.name}
                src={photoURL}
                style={{
                  width: 40,
                  height: 40
                }}
              />
            </Grid>
          )}
        </Grid>
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
      {showActions && (
        <Actions
          user={user}
          essay={essay}
          classes={{
            icon: classes.icon,
            button: classes.button
          }}
        />
      )}
    </Card>
  );
}

export const essayPropTypes = PropTypes.shape({
  question: PropTypes.string,
  link: PropTypes.string.isRequired,
  reviewerUID: PropTypes.string,
  ownerUID: PropTypes.string.isRequired
}).isRequired;

Essay.propTypes = {
  classes: PropTypes.object.isRequired,
  essay: essayPropTypes,
  user: PropTypes.object,
  review: PropTypes.bool,
  theme: PropTypes.object.isRequired
};

const styles = theme => ({
  card: {
    height: "100%",
    minWidth: 300
  },
  icon: {
    marginRight: theme.spacing.unit / 2,
    fontSize: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles, { withTheme: true })(Essay);
