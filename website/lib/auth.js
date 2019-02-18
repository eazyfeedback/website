import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "../lib/axios";
import secrets from "../../secrets";

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
      if (user)
        user
          .getIdToken()
          .then(token =>
            axios().post(`/auth/login`, {
              token
            })
          )
          .then(res => setUser(res.data.user));
      else
        axios()
          .post(`/auth/logout`)
          .then(() => setUser(null));
    }
    useEffect(() => {
      let unsubscribe;
      if (!firebase.apps.length) firebase.initializeApp(secrets.firebase.client);
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
