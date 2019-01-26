import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return <Typography>{this.props.statusCode ? `An error ${this.props.statusCode} occurred on server` : "An error occurred on client"}</Typography>;
  }
}

Error.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired
};
