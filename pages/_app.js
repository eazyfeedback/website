import App, { Container } from "next/app";
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
import secrets from "../secrets";

class MyApp extends App {
  constructor() {
    super();
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

  handleAuth(user) {
    if (user) {
      setUser(user);
      return user
        .getIdToken()
        .then(token => {
          return axios("/auth/login", {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json"
            }),
            credentials: "same-origin",
            body: JSON.stringify({
              token
            })
          });
        })
        .then(() => console.log("login successul"));
    } else {
      setUser(null);
      axios("/auth/logout", {
        method: "POST",
        credentials: "same-origin"
      }).then(() => console.log("logout successful"));
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    // if (!firebase.apps.length) {
    firebase.initializeApp(secrets.firebase.client);
    if (user) console.log(user);
    else console.log("no user");
    firebase.auth().onAuthStateChanged(handleAuth);
    // }
  }

  render() {
    const { Component, pageProps } = this.props;
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
            <div style={{ height: "100vh" }}>
              <Layout>
                <Component pageContext={this.pageContext} {...pageProps} />
              </Layout>
            </div>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }

  static getInitialProps({ req }) {
    const user = req && req.session ? req.session.decodedToken : null;
    return {
      user
    };
  }
}

MyApp.propTypes = {
  user: PropTypes.object.isRequired
};

export default MyApp;
