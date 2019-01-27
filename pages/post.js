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
import Router from "next/router";
import axios from "axios";
import getConfig from "next/config";
import { Stages, Areas, Doc } from "../components/post";

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
  const handleReset = () => {
    setActiveStep(0);
    setQuestion("");
    setChecked(initialChecked);
    setSelectedIndex(-1);
    setLink("");
  };
  const handleFinish = () => {
    const {
      publicRuntimeConfig: { APIEndpoint }
    } = getConfig();
    axios
      .post(APIEndpoint, {
        areas: checked,
        question,
        stage: stages[selectedIndex],
        link
      })
      .then(() => Router.push("/essays"));
  };
  const isAreas = () => checked.some(bool => bool === true);
  const isLink = () => link.length > 0 && link.includes("docs.google.com");
  const isStage = () => selectedIndex > -1;
  function getStepContent(step) {
    switch (step) {
      case 1:
        return <Areas areas={areas} checked={checked} handleCheck={handleCheck} question={question} setQuestion={setQuestion} />;
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
        return isAreas();
      case 0:
        return isStage();
      case 2:
        return isLink();
      default:
        return isStage();
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
          <Typography>All steps completed - your essay in now awaiting a reviewer in the essay pool</Typography>
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
