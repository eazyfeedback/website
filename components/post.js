import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";

const Areas = ({ areas, checked, handleCheck, question, setQuestion }) => (
  <div>
    {areas.map((area, idx) => (
      <Typography style={{ marginBottom: "1rem" }} key={idx}>
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

const Stages = ({ stages, selectedIndex, setSelectedIndex }) => (
  <div>
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

const Link = ({ link, setLink }) => (
  <div>
    <TextField
      label="Enter Google docs link"
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

const Review = props => {
  return (
    <div>
      review
      <p>reviw</p>
    </div>
  );
};

Review.propTypes = {};

export default Review;

export { Areas, Stages, Link, Review };
