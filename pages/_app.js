import App, { Container } from "next/app";
import PropTypes from "prop-types";
import Head from "next/head";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../lib/getPageContext";
import Layout from "../components/layout";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import axios from "axios";
import getConfig from "next/config";
import Appbar from "../components/appbar";
import secrets from "../secrets";

const {
  publicRuntimeConfig: { APIEndpoint }
} = getConfig();

function selectUser(user) {
  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL
  };
}

function createUser(user) {
  return axios.post(`${APIEndpoint}/users`, user);
}

function getUser(uid) {
  return axios.get(`${APIEndpoint}/users/${uid}`);
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {};
    if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
    let user = req && req.session ? req.session.decodedToken : null;
    console.info("_app.js getInitialProps > user", user);
    return { pageProps, user };
  }

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
    this.state = {
      user: this.props.user
    };
  }

  handleLogin() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  handleLogout() {
    firebase.auth().signOut();
  }

  handleAuth = user => {
    if (user) {
      console.info("_app.js handleAuth > user", user);
      user
        .getIdToken()
        .then(token =>
          axios("/auth/login", {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json"
            }),
            credentials: "same-origin",
            body: JSON.stringify({
              token
            })
          })
        )
        .then(() => getUser(user.uid))
        .catch(err => {
          return createUser(selectUser(user));
        })
        .then(res => {
          console.info("_app.js getUser/createUser > user", res.data.user);
          this.setState({ user: res.data.user });
        });
    } else {
      axios("/auth/logout", {
        method: "POST",
        credentials: "same-origin"
      }).then(() => this.setState({ user: null }));
    }
  };

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    firebase.initializeApp(secrets.firebase.client);
    firebase.auth().onAuthStateChanged(this.handleAuth);
  }

  render() {
    const { Component, pageProps } = this.props;
    const { user } = this.state;
    return (
      <Container>
        <Head>
          <title>essayfeedback</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider registry={this.pageContext.sheetsRegistry} generateClassName={this.pageContext.generateClassName}>
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
            <div style={{ minHeight: "100vh" }}>
              <Appbar handleLogin={this.handleLogin} handleLogout={this.handleLogout} user={user} />
              <Layout>
                <Component user={user} handleLogin={this.handleLogin} pageContext={this.pageContext} {...pageProps} />
              </Layout>
            </div>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

MyApp.propTypes = {
  user: PropTypes.object
};

export default MyApp;
