import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Signin = ({ handleLogin, message }) => (
  <div style={{ margin: 20 }}>
    <Typography gutterBottom>{message}</Typography>
    <Button onClick={handleLogin} color="primary" variant="outlined">
      sign in with google
    </Button>
  </div>
);

Signin.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

export default Signin;
