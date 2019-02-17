import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import secrets from "../secrets";
import APIEndpoint from "../lib/api";

function selector(user) {
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

function withAuth(Page) {
  function WithAuth(props) {
    const [user, setUser] = useState(null);
    function handleAuth(user) {
      if (user) {
        user
          .getIdToken()
          .then(token =>
            axios.post(`${APIEndpoint}/auth/login`, {
              token: JSON.stringify(token)
            })
          )
          .then(() => getUser(user.uid))
          .catch(err => createUser(selector(user)))
          .then(res => setUser(res.data.user));
      } else {
        axios(`${APIEndpoint}/auth/logout`, {
          method: "POST"
        }).then(() => setUser(null));
      }
    }
    useEffect(() => {
      let unsubscribe;
      if (!firebase.apps.length) firebase.initializeApp(secrets.firebase);
      if (!unsubscribe) unsubscribe = firebase.auth().onAuthStateChanged(handleAuth);
      return () => unsubscribe();
    }, []);

    return <Page {...props} user={user} handleLogin={handleLogin} handleLogout={handleLogout} />;
  }

  WithAuth.getInitialProps = async context => ({
    ...(Page.getInitialProps ? await Page.getInitialProps(context) : {})
  });

  return WithAuth;
}

withAuth.propTypes = {
  pageContext: PropTypes.object.isRequired
};

export default withAuth;
