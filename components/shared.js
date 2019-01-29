import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const SignInFirst = ({ handleLogin, message }) => (
  <div style={styles}>
    <Typography gutterBottom>{message}</Typography>
    <Button onClick={handleLogin} color="primary" variant="outlined">
      sign in with google
    </Button>
  </div>
);

const styles = {
  marginBottom: 12
};

SignInFirst.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export { SignInFirst };
