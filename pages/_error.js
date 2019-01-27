import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";

function Error({ statusCode }) {
  return <Typography>{statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}</Typography>;
}

Error.getInitialProps = async function({ res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired
};
