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
import Link from "next/link";
import { Areas, Doc, Stages } from "../src/post";

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

function handleFinish() {}

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
              <div>{getStepContent(index)}</div>
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
                    Next
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
          <Link href="/essays" passHref prefetch>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              handleFinish={handleFinish}
            >
              finish
            </Button>
          </Link>
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
