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
import Router from "next/router";
import axios from "axios";
import { Grid } from "@material-ui/core";
import getConfig from "next/config";
const {
  publicRuntimeConfig: { APIEndpoint }
} = getConfig();

function getSteps() {
  return ["What stage are you in?", "What areas do you want feedback on?", "Post Google docs link"];
}

function getStages() {
  return ["Early polished draft", "Revised draft", "Late or final polished draft"];
}

export function getAreas() {
  return [
    "Interpretation/analysis i.e. Does my essay make sense? Is it logical and consistent?",
    "Organization i.e. Are my ideas in a useful order? Is there another way to consider ordering them?",
    "Flow i.e. Do I have good transitions? Can the reader follow me?",
    "Style i.e. Is my writing style appealing? Do I use the passive voice too often?"
  ];
}

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
      <Grid container>
        <Grid item>
          <Checkbox checked={customArea[0]} onChange={e => setCustomArea([e.target.checked, customArea[1]])} />
        </Grid>
        <Grid item xs={8}>
          <TextField label="Other area" fullWidth onChange={e => setCustomArea([customArea[0], e.target.value])} value={customArea[1]} type="text" />
        </Grid>
      </Grid>
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
        helperText={`ensure "Anyone with link can question" sharing permission`}
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

function Post({ classes }) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const areas = getAreas();
  const [question, setQuestion] = useState("");
  const initialChecked = Array.from(Array(areas.length), () => false);
  const [checked, setChecked] = useState(initialChecked);
  const handleCheck = (e, idx) => setChecked(checked.map((bool, i) => (i === idx ? e.target.checked : bool)));
  const stages = getStages();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [link, setLink] = useState("");
  const [customArea, setCustomArea] = useState([false, ""]);

  const handleReset = () => {
    setActiveStep(0);
    setQuestion("");
    setChecked(initialChecked);
    setSelectedIndex(-1);
    setLink("");
    setCustomArea([false, ""]);
  };

  const handleFinish = () => {
    axios
      .post(APIEndpoint, {
        areas: checked,
        question,
        stage: stages[selectedIndex],
        link,
        customArea: customArea[1]
      })
      .then(() => Router.push("/essays"));
  };

  const isArea = () => checked.some(bool => bool === true) || (customArea[0] && customArea[1].length > 0);
  const isLink = () => link.length > 0 && link.startsWith("docs.google.com");
  const isStage = () => selectedIndex > -1;

  function getStepContent(step) {
    switch (step) {
      case 1:
        return (
          <Areas
            areas={areas}
            checked={checked}
            handleCheck={handleCheck}
            question={question}
            setQuestion={setQuestion}
            customArea={customArea}
            setCustomArea={setCustomArea}
          />
        );
      case 0:
        return <Stages stages={stages} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />;
      case 2:
        return <Doc link={link} setLink={setLink} />;
      default:
        return "Unknown step";
    }
  }

  const canGoNext = step => {
    switch (step) {
      case 1:
        return isArea();
      case 0:
        return isStage();
      case 2:
        return isLink();
      default:
        return isArea();
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div>{getStepContent(index)}</div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext} className={classes.button} disabled={!canGoNext(activeStep)}>
                    {activeStep === steps.length - 1 ? "Complete" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - your essay in now awaiting a reviwer in the feedback pool</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
          <Button variant="contained" color="secondary" className={classes.button} onClick={handleFinish}>
            go to essays
          </Button>
        </Paper>
      )}
    </div>
  );
}

const styles = theme => ({
  root: {
    width: "100%"
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

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
