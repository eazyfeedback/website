import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import Essay, { essayPropTypes } from "./essay";

const Stages = ({ stages, selectedIndex, setSelectedIndex }) => (
  <div>
    <Typography gutterBottom color="textSecondary" variant="body1">
      What stage are you in?
    </Typography>
    {stages.map((stage, idx) => (
      <Typography key={idx}>
        <Radio checked={selectedIndex === idx} onChange={() => setSelectedIndex(idx)} value={idx} />
        {stage}
      </Typography>
    ))}
  </div>
);

Stages.propTypes = {
  stages: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  setSelectedIndex: PropTypes.func.isRequired
};

const Areas = ({ areas, checked, handleCheck, question, setQuestion }) => (
  <div>
    <Typography gutterBottom color="textSecondary" variant="body1">
      What areas do you want feedback on?
    </Typography>
    {areas.map((area, idx) => (
      <Typography key={idx} style={{ marginBottom: "1rem" }}>
        <Checkbox checked={checked[idx]} onChange={e => handleCheck(e, idx)} style={{ padding: `0px 4px` }} />
        {area}
      </Typography>
    ))}
    <TextField
      label="Details for the reviewer..."
      fullWidth
      onChange={e => setQuestion(e.target.value)}
      value={question}
      helperText="Example: Does the third paragraph make sense?"
      multiline
      inputProps={{
        maxLength: 200
      }}
      rows="2"
      rowsMax="2"
      type="text"
    />
  </div>
);

Areas.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  checked: PropTypes.arrayOf(PropTypes.bool).isRequired,
  question: PropTypes.string.isRequired,
  handleCheck: PropTypes.func.isRequired,
  setQuestion: PropTypes.func.isRequired
};

const Link = ({ link, setLink, sharing, setSharing }) => (
  <div>
    <Typography gutterBottom color="textSecondary" variant="body1">
      Enter your essay's Google Docs link
    </Typography>
    <TextField
      label="Paste Google Docs link"
      onChange={e => setLink(e.target.value)}
      value={link}
      InputLabelProps={{ shrink: true }}
      type="url"
      fullWidth
      required
      style={{ marginBottom: 20 }}
    />
    <Typography gutterBottom color="textSecondary" variant="body1">
      <Checkbox checked={sharing} onChange={e => setSharing(e.target.checked)} style={{ padding: `0px 4px` }} />
      I've set "Anyone with the link can comment" sharing permission on Google Docs<sup>*</sup>
    </Typography>
  </div>
);

Link.propTypes = {
  link: PropTypes.string.isRequired,
  setLink: PropTypes.func.isRequired
};

const Review = ({ essay, user }) => (
  <div>
    <Typography gutterBottom color="textSecondary" variant="body1">
      Review your feedback request
    </Typography>
    <div style={{ marginBottom: 12, width: 340 }}>
      <Essay essay={essay} user={user} review />
    </div>
  </div>
);

Review.propTypes = {
  essay: Object.assign(essayPropTypes, { areas: PropTypes.arrayOf(PropTypes.string).isRequired, stage: PropTypes.string.isRequired }),
  user: PropTypes.object
};

export { Areas, Stages, Link, Review };
