import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const SignInFirst = ({ handleLogin, message }) => (
  <div style={{ marginBottom: 12 }}>
    <Typography gutterBottom>{message}</Typography>
    <Button onClick={handleLogin} color="primary" variant="outlined">
      sign in with google
    </Button>
  </div>
);

SignInFirst.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

function getBackgroundColor(user, essay) {
  if (user && essay) {
    switch (user.UID) {
      case essay.reviewerUID:
        return "#3f51b5";
      case essay.ownerID:
        return "#e91e63";
      default:
        return "#000";
    }
  }
  return "#000";
}

let Essay = ({ essay, user, classes }) => (
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
        <Typography key={idx} variant="body1" gutterBottom={idx === areas.length - 1}>
          {`${idx + 1}. ${area}`}
        </Typography>
      ))}
      {essay.question && (
        <>
          <Typography color="textSecondary">Question</Typography>
          <Typography variant="body1">{essay.question}</Typography>
        </>
      )}
    </CardContent>
    {user && (
      <CardActions className={classes.actions}>
        <Button href={essay.link} target="_blank" rel="noreferrer" color="secondary">
          review
        </Button>
        <Button href={essay.link} target="_blank" rel="noreferrer" color="primary">
          remove
        </Button>
        <Button href={essay.link} target="_blank" rel="noreferrer" color="inherit">
          check off
        </Button>
        <Button href={essay.link} target="_blank" rel="noreferrer" color="default">
          mark as complete
        </Button>
      </CardActions>
    )}
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
    question: PropTypes.string.isRequired,
    stage: PropTypes.string.isRequired,
    areas: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string.isRequired,
    reviewerUID: PropTypes.string.isRequired,
    ownerUID: PropTypes.string.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object
};

Essay = withStyles(essayStyles)(Essay);

export { SignInFirst, Essay };
