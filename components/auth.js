import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import axios from "axios";
import getConfig from "next/config";
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

function handleLogin() {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

function handleLogout() {
  firebase.auth().signOut();
}

const withAuth = Page => {
  const WithAuth = props => {
    const [user, setUser] = useState(props.user);

    function handleAuth(user) {
      if (user) {
        console.info("auth.js handleAuth > user", user);
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
            console.info("auth.js getUser/createUser > user", res.data.user);
            setUser(res.data.user);
          });
      } else {
        axios("/auth/logout", {
          method: "POST",
          credentials: "same-origin"
        }).then(() => setUser(user));
      }
    }

    useEffect(() => {
      if (!firebase.apps.length) {
        firebase.initializeApp(secrets.firebase.client);
        firebase.auth().onAuthStateChanged(handleAuth);
      }
    });

    return <Page {...props} user={user} handleLogin={handleLogin} handleLogout={handleLogout} />;
  };

  WithAuth.getInitialProps = async function(context) {
    const user = context.req && context.req.session ? context.req.session.decodedToken : null;
    console.info("auth.js getInitialProps > user", user);
    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      user
    };
  };

  return WithAuth;
};

withAuth.propTypes = {
  pageContext: PropTypes.object.isRequired
};

export default withAuth;
