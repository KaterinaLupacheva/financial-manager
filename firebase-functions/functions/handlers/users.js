const { db } = require("../util/admin");

const config = require("../util/firebaseConfig");

const firebase = require("firebase");
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require("../util/validators");

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };

  const { errors, valid } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ email: "this email is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.doc(`/users/${newUser.email}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { errors, valid } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-email"
      ) {
        return res
          .status(403)
          .json({ general: "Wrong credentials. Please try again" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};

exports.addUserDetails = (req, res) => {
  db.doc(`/users/${req.user.email}`)
    .update(req.body)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getUserDetails = (req, res) => {
  db.doc(`/users/${req.user.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.json(doc.data());
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
