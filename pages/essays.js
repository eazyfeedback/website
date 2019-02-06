import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import getConfig from "next/config";
import Essay from "../components/essay";
import { getSelectedAreas, getSelectedStage } from "../pages/post";
import Layout from "../components/layout";
import withAuth from "../components/auth";

const formatEssays = essays =>
  essays.map(({ selectedStage, selectedAreas, question, link, ownerUID, reviewerUID, _id }) => ({
    areas: getSelectedAreas(selectedAreas),
    stage: getSelectedStage(selectedStage),
    question,
    link,
    ownerUID,
    reviewerUID,
    id: _id
  }));

Essays.getInitialProps = async function() {
  const {
    publicRuntimeConfig: { APIEndpoint }
  } = getConfig();
  const {
    data: { essays }
  } = await axios.get(`${APIEndpoint}/essays`);
  return { essays: formatEssays(essays) };
};

const Essays = ({ essays, user, handleLogin, handleLogout }) => (
  <Layout
    handleLogin={handleLogin}
    handleLogout={handleLogout}
    user={user}
    signInRequired={false}
    signInVisible={true}
    message="You need to sign in to review an essay"
  >
    <Grid container spacing={16} style={{ paddingTop: 8, paddingBottom: 8 }}>
      {essays.map((essay, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
          <Essay essay={essay} user={user} />
        </Grid>
      ))}
    </Grid>
  </Layout>
);

Essays.propTypes = {
  essays: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      stage: PropTypes.string.isRequired,
      areas: PropTypes.arrayOf(PropTypes.string).isRequired,
      link: PropTypes.string.isRequired,
      ownerUID: PropTypes.string.isRequired,
      reviewerUID: PropTypes.string
    })
  ).isRequired,
  user: PropTypes.object,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default withAuth(Essays);
