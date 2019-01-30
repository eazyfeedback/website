import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { Essay } from "./shared";

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
      margin="normal"
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

const Link = ({ link, setLink }) => (
  <div>
    <Typography gutterBottom color="textSecondary" variant="body1">
      Enter your essay's Google docs link
    </Typography>
    <TextField
      label="Paste Google docs link"
      margin="normal"
      onChange={e => setLink(e.target.value)}
      value={link}
      helperText={`ensure "Anyone with link can comment" sharing permission`}
      type="url"
      required
    />
  </div>
);

Link.propTypes = {
  link: PropTypes.string.isRequired,
  setLink: PropTypes.func.isRequired
};

const Review = ({ essay, user }) => {
  return (
    <div>
      <Typography gutterBottom color="textSecondary" variant="body1">
        Review your feedback request
      </Typography>
      <div style={{ marginBottom: 10, maxWidth: 320 }}>
        <Essay essay={essay} user={user} postReview />
      </div>
    </div>
  );
};

Review.propTypes = {
  essay: PropTypes.shape({
    question: PropTypes.string,
    stage: PropTypes.string,
    areas: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string.isRequired,
    ownerUID: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.object
};

export { Areas, Stages, Link, Review };
