import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import getConfig from "next/config";
import { SignInFirst, Essay } from "../components/shared";
import { getAreas, getStages } from "../pages/post";

const areas = getAreas();
const stages = getStages();
const formatAreas = selectedAreas => selectedAreas.map((bool, idx) => (bool ? areas[idx] : "")).filter(elem => elem !== "");
const formatStage = selectedIndex => stages[selectedIndex];
const formatEssays = essays =>
  essays.map(({ selectedStage, selectedAreas, question, link }) => ({
    areas: formatAreas(selectedAreas),
    stage: formatStage(selectedStage),
    question,
    link,
    ownerUID,
    reviewerUID
  }));

const Essays = ({ essays, user, handleLogin }) => (
  <>
    {!user && <SignInFirst handleLogin={handleLogin} message="You need to sign in to review an essay" />}
    <Grid container spacing={16}>
      {essays.map((essay, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
          <Essay essay={essay} user={user} />
        </Grid>
      ))}
    </Grid>
  </>
);

Essays.getInitialProps = async () => {
  const {
    publicRuntimeConfig: { APIEndpoint }
  } = getConfig();
  const { data } = await axios.get(APIEndpoint);
  return { essays: formatEssays(data) };
};

Essays.propTypes = {
  essays: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      stage: PropTypes.string.isRequired,
      areas: PropTypes.arrayOf(PropTypes.string).isRequired,
      link: PropTypes.string.isRequired,
      ownerUID: PropTypes.string.isRequired,
      reviewerUID: PropTypes.string.isRequired
    })
  ),
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  handleLogin: PropTypes.func
};

export default Essays;
