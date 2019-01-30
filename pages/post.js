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
import Grid from "@material-ui/core/Grid";
import { Stages, Areas, Link, Review } from "../components/post";
import { SignInFirst } from "../components/shared";

function getStepsHeadings() {
  return ["Stage", "Areas", "Essay", "Review"];
}

export function getStages() {
  return ["Early draft", "Revised draft", "Late draft"];
}

export function getAreas() {
  return [
    "Interpretation/analysis i.e. Does my essay make sense? Is it logical and consistent?",
    "Organization i.e. Are my ideas in a useful order? Is there another way to consider ordering them?",
    "Flow i.e. Do I have good transitions? Can the reader follow me?",
    "Style i.e. Is my writing style appealing? Do I use the passive voice too often?"
  ];
}

function Post({ classes, user, handleLogin }) {
  const [activeStep, setActiveStep] = useState(0);
  const areas = getAreas();
  const steps = getStepsHeadings();
  const stages = getStages();
  const initialSelectedAreas = Array.from(Array(areas.length), () => false);
  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
  const [question, setQuestion] = useState("");
  const [selectedAreas, setSelectedAreas] = useState(initialSelectedAreas);
  const handleCheck = (e, idx) => setSelectedAreas(selectedAreas.map((bool, i) => (i === idx ? e.target.checked : bool)));
  const [selectedStage, setSelectedStage] = useState(-1);
  const [link, setLink] = useState("");
  const isAreasComplete = () => selectedAreas.some(bool => bool === true) || question.length > 0;
  const isLinkComplete = () => link.length > 0 && link.includes("docs.google.com");
  const isStageComplete = () => selectedStage > -1;
  const getSelectedAreas = () => selectedAreas.map((bool, idx) => (bool ? areas[idx] : "")).filter(area => area !== "");
  const getSelectedStage = () => stages[selectedStage];
  function getStepContent(step) {
    switch (step) {
      case 1:
        return <Areas areas={areas} checked={selectedAreas} handleCheck={handleCheck} question={question} setQuestion={setQuestion} />;
      case 0:
        return <Stages stages={stages} selectedIndex={selectedStage} setSelectedIndex={setSelectedStage} />;
      case 2:
        return <Link link={link} setLink={setLink} />;
      default:
      case 3:
        return <Review areas={getSelectedAreas()} question={question} stage={getSelectedStage()} link={link} />;
    }
  }
  function canGoNext(step) {
    switch (step) {
      case 1:
        return isAreasComplete();
      case 0:
        return isStageComplete();
      case 2:
        return isLinkComplete();
      default:
        return true;
    }
  }
  function handleReset() {
    setActiveStep(0);
    setQuestion("");
    setSelectedAreas(initialSelectedAreas);
    setSelectedStage(-1);
    setLink("");
  }
  function handleFinish() {
    const {
      publicRuntimeConfig: { APIEndpoint }
    } = getConfig();
    axios
      .post(APIEndpoint, {
        selectedAreas,
        question,
        selectedStage,
        link
      })
      .then(() => Router.push("/essays"));
  }
  return (
    <>
      {user ? (
        <div className={classes.layout}>
          <Typography className={classes.text} variant="subtitle1">
            These details will help your reviewer give you the feedback you want.
          </Typography>
          <Grid container justify="center" alignItems="center" direction="column">
            <Grid item xs={12} className={classes.stepper}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <div>{getStepContent(index)}</div>
                      <div className={classes.actions}>
                        <div>
                          <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                            disabled={!canGoNext(activeStep)}
                          >
                            {activeStep === steps.length - 1 ? "finish" : "Next"}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.reset}>
                  <Typography>All steps completed - your essay in now awaiting a reviewer to give feedback</Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                  <Button variant="contained" color="secondary" className={classes.button} onClick={handleFinish}>
                    go to essays
                  </Button>
                </Paper>
              )}
            </Grid>
          </Grid>
        </div>
      ) : (
        <SignInFirst handleLogin={handleLogin} message="You need to sign in to post for feedback" />
      )}
    </>
  );
}

const styles = theme => ({
  stepper: {
    width: "100vw"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actions: {
    marginBottom: theme.spacing.unit * 2
  },
  reset: {
    padding: theme.spacing.unit * 3
  },
  layout: {
    width: "auto",
    [theme.breakpoints.up(600)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  text: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  handleLogin: PropTypes.func
};

export default withStyles(styles)(Post);
