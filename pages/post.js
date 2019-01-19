import { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { getStages, getAreas } from "../data/text";

function Areas() {
  const areas = getAreas();
  const initialChecked = Array.from(Array(areas.length), () => false);
  const [checked, setChecked] = useState(initialChecked);
  const [text, setText] = useState("");
  function handleCheck(e, idx) {
    setChecked(checked.map((bool, i) => (i === idx ? e.target.checked : bool)));
  }
  return (
    <div>
      {areas.map((area, idx) => (
        <div key={idx}>
          <Checkbox
            checked={checked[idx]}
            onChange={e => handleCheck(e, idx)}
          />
          {area}
        </div>
      ))}
      <TextField
        label="Questions or notes for the reviewer..."
        fullWidth
        margin="normal"
        onChange={e => setText(e.target.value)}
        value={text}
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

function Stages() {
  const stages = getStages();
  const [selectedIndex, setSelectedIndex] = useState(1);
  return (
    <div>
      {stages.map((area, idx) => (
        <p key={idx}>
          <Radio
            checked={selectedIndex === idx}
            onChange={() => setSelectedIndex(idx)}
            value={idx}
          />
          {area}
        </p>
      ))}
    </div>
  );
}

function Doc() {
  const [link, setLink] = useState("");
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

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Areas />;
    case 1:
      return <Stages />;
    case 2:
      return <Doc />;
    default:
      return "Unknown step";
  }
}

function getSteps() {
  return [
    "What areas do you want feedback on?",
    "What stage are you in?",
    "Post Google docs link"
  ];
}

function Post({ classes }) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }
  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }
  function handleReset() {
    setActiveStep(0);
  }
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Post" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>
            All steps completed - your essay in now awaiting a reviwer in the
            feedback pool
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    width: "96%"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

export default withStyles(styles)(Post);
