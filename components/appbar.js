import { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import NextLink from "next/link";
import MaterialLink from "@material-ui/core/Link";
import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import axios from "axios";
import secrets from "../secrets";

function Appbar(props) {
  const [user, setUser] = useState(props.user);

  function handleAuth(user) {
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

  useEffect(() => {
    firebase.initializeApp(secrets.firebase.client);
    if (user) console.log(user);
    else console.log("no user");
    firebase.auth().onAuthStateChanged(handleAuth);
  });

  function handleLogin() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  function handleLogout() {
    firebase.auth().signOut();
  }

  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NextLink href="/" prefetch passHref>
            <MaterialLink variant="h6" color="inherit" className={classes.grow}>
              essayfeedback
            </MaterialLink>
          </NextLink>
          <NextLink href="/post" passHref prefetch>
            <Button color="inherit">get feedback</Button>
          </NextLink>
          <NextLink href="/essays" passHref prefetch>
            <Button color="inherit">review essay</Button>
          </NextLink>
          <NextLink href="/essays" passHref prefetch>
            {user ? (
              <Button color="inherit" onClick={handleLogin}>
                logout
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            )}
          </NextLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Appbar.getInitialProps = async function({ req }) {
  const user = req && req.session ? req.session.decodedToken : null;
  return {
    user
  };
};

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

Appbar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default withStyles(styles)(Appbar);
