import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NextLink from "next/link";
import axios from "axios";
import { Stages, Areas, Link, Review } from "../components/post";
import Layout from "../components/layout";
import withAuth from "../lib/auth";

const stages = getStages();
const areas = getAreas();
export const getSelectedAreas = selectedAreas => selectedAreas.map((bool, idx) => (bool ? areas[idx] : "")).filter(area => area !== "");
export const getSelectedStage = selectedStage => stages[selectedStage];

function getStepsHeadings() {
  return ["Stage", "Areas", "Link", "Review"];
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

function Post({ classes, user, handleLogin, handleLogout, APIEndpoint }) {
  const steps = getStepsHeadings();
  const initialSelectedAreas = Array.from(Array(areas.length), () => false);
  const [ownerUID, setOwnerUID] = useState("");
  useEffect(() => {
    if (user) setOwnerUID(user.uid);
  });
  const [activeStep, setActiveStep] = useState(0);
  const [question, setQuestion] = useState("");
  const [selectedAreas, setSelectedAreas] = useState(initialSelectedAreas);
  const [selectedStage, setSelectedStage] = useState(-1);
  const [link, setLink] = useState("");
  const handleCheck = (e, idx) => setSelectedAreas(selectedAreas.map((bool, i) => (i === idx ? e.target.checked : bool)));
  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
  const isAreasComplete = () => selectedAreas.some(bool => bool === true) || question.length > 0;
  const isLinkComplete = () => link.length > 0 && link.startsWith("https://docs.google.com/document/d/");
  const isStageComplete = () => selectedStage > -1;
  function getStepContent(step) {
    switch (step) {
      case 1:
        return <Areas areas={areas} checked={selectedAreas} handleCheck={handleCheck} question={question} setQuestion={setQuestion} />;
      case 0:
        return <Stages stages={stages} selectedIndex={selectedStage} setSelectedIndex={setSelectedStage} />;
      case 2:
        return <Link link={link} setLink={setLink} />;
      case 3:
        return (
          <Review
            essay={{
              areas: getSelectedAreas(selectedAreas),
              stage: getSelectedStage(selectedStage),
              link,
              question,
              ownerUID
            }}
            user={user}
          />
        );
      default:
        return <Typography>Nothing to show</Typography>;
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
    axios
      .post(`${APIEndpoint}/essays`, {
        selectedAreas,
        question,
        selectedStage,
        link,
        ownerUID,
        status: false
      })
      .then(() => handleNext())
      .catch(() => handleNext());
  }
  return (
    <Layout
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      user={user}
      signInRequired={true}
      signInVisible={true}
      message="You need to sign in to post your essay for feedback"
    >
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
                        <Button
                          disabled={activeStep === 0}
                          onClick={activeStep === steps.length - 1 ? handleReset : handleBack}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? "reset" : "back"}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
                          className={classes.button}
                          disabled={!canGoNext(activeStep)}
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
              <Paper square elevation={0} className={classes.reset}>
                <Typography>All steps completed. Your essay in now awaiting a reviewer to give feedback</Typography>
                <NextLink href="/essays" prefetch>
                  <Button href="/essays" variant="contained" color="secondary" className={classes.button}>
                    go to essays
                  </Button>
                </NextLink>
              </Paper>
            )}
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

const styles = theme => ({
  stepper: {
    width: "100%"
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
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default withStyles(styles)(withAuth(Post));
