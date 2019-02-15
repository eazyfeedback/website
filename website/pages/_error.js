import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";

const Error = ({ statusCode }) => <Typography>{statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}</Typography>;

Error.getInitialProps = ({ res, err }) => ({
  statusCode: res ? res.statusCode : err ? err.statusCode : null
});

Error.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Error;
