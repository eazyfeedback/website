import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";

function Areas({ areas, checked, handleCheck, question, setQuestion, customArea, setCustomArea }) {
  return (
    <div>
      {areas.map((area, idx) => (
        <div key={idx}>
          <Typography>
            <Checkbox checked={checked[idx]} onChange={e => handleCheck(e, idx)} />
            {area}
          </Typography>
        </div>
      ))}
      <TextField
        style={{
          marginLeft: 48
        }}
        label="Other area"
        onChange={e => setCustomArea(e.target.value)}
        value={customArea}
        type="text"
        fullWidth
      />
      <TextField
        label="Questions or notes for the reviewer..."
        fullWidth
        margin="normal"
        onChange={e => setQuestion(e.target.value)}
        value={question}
        inputProps={{ maxLength: "200" }}
        helperText="Example: Does the third paragraph make sense?"
        multiline
        rows="2"
        rowsMax="3"
        type="text"
      />
    </div>
  );
}

Areas.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  checked: PropTypes.arrayOf(PropTypes.bool).isRequired,
  question: PropTypes.string.isRequired,
  handleCheck: PropTypes.func.isRequired,
  setQuestion: PropTypes.func.isRequired
};

function Stages({ stages, selectedIndex, setSelectedIndex }) {
  return (
    <div>
      {stages.map((stage, idx) => (
        <Typography key={idx}>
          <Radio checked={selectedIndex === idx} onChange={() => setSelectedIndex(idx)} value={idx} />
          {stage}
        </Typography>
      ))}
    </div>
  );
}

Stages.propTypes = {
  stages: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  setSelectedIndex: PropTypes.func.isRequired
};

function Doc({ link, setLink }) {
  return (
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
}

Doc.propTypes = {
  link: PropTypes.string.isRequired,
  setLink: PropTypes.func.isRequired
};

export { Areas, Stages, Doc };
